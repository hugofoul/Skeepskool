<?php
/**
 * Skeepskool — envoi du récapitulatif d'une réservation ou d'un bon cadeau
 * à l'école, par e-mail, via l'API Resend (https://resend.com).
 *
 * Appelé en POST (JSON) par les formulaires du site.
 * La configuration (clé API…) est dans config.php, à côté de ce fichier :
 * il n'est PAS dans Git. Voir config.example.php.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    respond(500, ['ok' => false, 'error' => 'not_configured']);
}
$config = require $configFile;
$apiKey = trim((string) ($config['resend_api_key'] ?? ''));
$to = trim((string) ($config['to'] ?? 'skeepskool@hotmail.com'));
$from = trim((string) ($config['from'] ?? 'Skeepskool <onboarding@resend.dev>'));
$apiUrl = (string) ($config['api_url'] ?? 'https://api.resend.com/emails');
if ($apiKey === '') {
    respond(500, ['ok' => false, 'error' => 'not_configured']);
}

// Only accept requests coming from the site itself.
$allowedHosts = $config['allowed_hosts'] ?? ['www.leporge-ecoledesurf.com', 'leporge-ecoledesurf.com'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$originHost = $origin !== '' ? (string) parse_url($origin, PHP_URL_HOST) : '';
if ($originHost !== '' && !in_array($originHost, $allowedHosts, true)) {
    respond(403, ['ok' => false, 'error' => 'forbidden']);
}

$raw = file_get_contents('php://input', false, null, 0, 50000);
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'invalid_json']);
}

// Honeypot: hidden field that humans leave empty.
if (!empty($data['website'])) {
    respond(200, ['ok' => true]);
}

// Simple rate limit: 8 requests per 10 minutes per IP.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/skeepskool-rate-' . hash('sha256', $ip);
$now = time();
$hits = array_filter(
    is_file($rateFile) ? (array) json_decode((string) file_get_contents($rateFile), true) : [],
    static fn ($t) => is_int($t) && $t > $now - 600
);
if (count($hits) >= 8) {
    respond(429, ['ok' => false, 'error' => 'too_many_requests']);
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode(array_values($hits)));

function text($value, int $max = 200): string
{
    $value = is_scalar($value) ? (string) $value : '';
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr(trim($value), 0, $max);
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$type = ($data['type'] ?? '') === 'gift' ? 'gift' : 'booking';
$contact = is_array($data['contact'] ?? null) ? $data['contact'] : [];
$firstName = text($contact['firstName'] ?? '', 80);
$lastName = text($contact['lastName'] ?? '', 80);
$phone = text($contact['phone'] ?? '', 40);
$email = text($contact['email'] ?? '', 120);
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $email = '';
}
if ($firstName === '' || $lastName === '' || $phone === '') {
    respond(422, ['ok' => false, 'error' => 'missing_fields']);
}

$surfers = [];
foreach (array_slice(is_array($data['surfers'] ?? null) ? $data['surfers'] : [], 0, 30) as $surfer) {
    if (!is_array($surfer)) {
        continue;
    }
    $surfers[] = [text($surfer['name'] ?? '', 120), text($surfer['package'] ?? '', 120)];
}
$total = text($data['total'] ?? '', 20);
$startDate = text($data['startDate'] ?? '', 40);
$endDate = text($data['endDate'] ?? '', 40);
$giftVisual = !empty($data['giftVisual']);
$lang = text($data['lang'] ?? 'fr', 5);
$summary = text($data['summary'] ?? '', 6000);

$fullName = trim("$firstName $lastName");
$kind = $type === 'gift' ? 'Bon cadeau' : 'Réservation';
$subject = sprintf(
    '%s — %s — %d surfeur%s — %s €',
    $type === 'gift' ? 'Nouveau bon cadeau' : 'Nouvelle réservation',
    $fullName,
    count($surfers),
    count($surfers) > 1 ? 's' : '',
    $total
);

$rows = [
    ['Demande', $kind],
    ['Nom', $fullName],
    ['Téléphone', $phone],
    ['E-mail', $email !== '' ? $email : '—'],
];
if ($type === 'booking') {
    $rows[] = ['Date de début souhaitée', $startDate !== '' ? $startDate : 'Non précisée'];
    $rows[] = ['Date de fin souhaitée', $endDate !== '' ? $endDate : 'Non précisée'];
} else {
    $rows[] = ['Visuel bon cadeau', $giftVisual ? 'Oui' : 'Non'];
}
$rows[] = ['Total', "$total €"];
$rows[] = ['Langue du site', strtoupper($lang)];

$phoneLink = preg_replace('/[^0-9+]/', '', $phone);
$html = '<div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;max-width:600px">';
$html .= '<h2 style="color:#002654;margin:0 0 12px">' . h($type === 'gift' ? 'Nouvelle demande de bon cadeau' : 'Nouvelle demande de réservation') . '</h2>';
$html .= '<table cellpadding="6" style="border-collapse:collapse;width:100%">';
foreach ($rows as [$label, $value]) {
    $cell = h($value);
    if ($label === 'Téléphone') {
        $cell = '<a href="tel:' . h($phoneLink) . '">' . $cell . '</a>';
    } elseif ($label === 'E-mail' && $email !== '') {
        $cell = '<a href="mailto:' . h($email) . '">' . $cell . '</a>';
    }
    $html .= '<tr><td style="border-bottom:1px solid #eee;color:#555;width:42%">' . h($label) . '</td><td style="border-bottom:1px solid #eee;font-weight:bold">' . $cell . '</td></tr>';
}
$html .= '</table>';
$html .= '<h3 style="color:#002654;margin:20px 0 8px">Surfeurs</h3><ol style="padding-left:20px;margin:0">';
foreach ($surfers as [$name, $package]) {
    $html .= '<li>' . h($name !== '' ? $name : '(sans nom)') . ' — ' . h($package) . '</li>';
}
$html .= '</ol>';
if ($summary !== '') {
    $html .= '<h3 style="color:#002654;margin:20px 0 8px">Message tel que préparé pour WhatsApp</h3>';
    $html .= '<pre style="white-space:pre-wrap;background:#f4f4f4;padding:12px;border-radius:8px;font-family:inherit">' . h($summary) . '</pre>';
}
$html .= '<p style="color:#888;font-size:12px;margin-top:20px">Envoyé depuis le formulaire du site leporge-ecoledesurf.com. '
    . ($email !== '' ? 'Répondez directement à cet e-mail pour écrire au client.' : 'Le client n’a pas indiqué d’e-mail : contactez-le par téléphone ou WhatsApp.')
    . '</p></div>';

$textLines = [];
foreach ($rows as [$label, $value]) {
    $textLines[] = "$label : $value";
}
$textLines[] = '';
$textLines[] = 'Surfeurs :';
foreach ($surfers as $i => [$name, $package]) {
    $textLines[] = ($i + 1) . ". $name — $package";
}

$payload = [
    'from' => $from,
    'to' => [$to],
    'subject' => $subject,
    'html' => $html,
    'text' => implode("\n", $textLines),
];
if ($email !== '') {
    $payload['reply_to'] = $email;
}

$ch = curl_init($apiUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 12,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
]);
$response = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    error_log('[skeepskool] Resend error ' . $status . ' ' . $curlError . ' ' . substr((string) $response, 0, 500));
    respond(502, ['ok' => false, 'error' => 'send_failed']);
}

respond(200, ['ok' => true]);
