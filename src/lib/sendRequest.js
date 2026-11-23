// Envoie le récapitulatif d'une réservation ou d'un bon cadeau par e-mail
// (script PHP public/api/send-request.php, qui passe par Resend).
// Renvoie true si l'e-mail est parti, false sinon (le formulaire propose alors WhatsApp).

const ENDPOINT = '/api/send-request.php'
const TIMEOUT_MS = 15000

export async function sendRequestEmail(payload) {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
  const timer = controller ? setTimeout(() => controller.abort(), TIMEOUT_MS) : null
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller?.signal,
    })
    if (!response.ok) return false
    const data = await response.json().catch(() => null)
    return Boolean(data?.ok)
  } catch {
    return false
  } finally {
    if (timer) clearTimeout(timer)
  }
}
