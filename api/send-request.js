// Version Vercel de public/api/send-request.php (utilisée pendant la phase de test
// sur Vercel ; sur OVH, c'est le script PHP qui répond).
// Variables d'environnement à définir dans Vercel :
//   RESEND_API_KEY  (obligatoire)
//   MAIL_TO         (par défaut skeepskool@hotmail.com)
//   MAIL_FROM       (par défaut "Skeepskool <onboarding@resend.dev>")

const text = (value, max = 200) => (typeof value === 'string' || typeof value === 'number' ? String(value) : '')
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  .trim()
  .slice(0, max)

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }
  const apiKey = (process.env.RESEND_API_KEY || '').trim()
  if (!apiKey) return res.status(500).json({ ok: false, error: 'not_configured' })

  const data = typeof req.body === 'object' && req.body ? req.body : {}
  if (data.website) return res.status(200).json({ ok: true })

  const type = data.type === 'gift' ? 'gift' : 'booking'
  const contact = data.contact || {}
  const firstName = text(contact.firstName, 80)
  const lastName = text(contact.lastName, 80)
  const phone = text(contact.phone, 40)
  let email = text(contact.email, 120)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) email = ''
  if (!firstName || !lastName || !phone) return res.status(422).json({ ok: false, error: 'missing_fields' })

  const surfers = (Array.isArray(data.surfers) ? data.surfers : []).slice(0, 30)
    .map((surfer) => [text(surfer?.name, 120), text(surfer?.package, 120)])
  const total = text(data.total, 20)
  const fullName = `${firstName} ${lastName}`
  const rows = [
    ['Demande', type === 'gift' ? 'Bon cadeau' : 'Réservation'],
    ['Nom', fullName],
    ['Téléphone', phone],
    ['E-mail', email || '—'],
    ...(type === 'booking'
      ? [['Date de début souhaitée', text(data.startDate, 40) || 'Non précisée'], ['Date de fin souhaitée', text(data.endDate, 40) || 'Non précisée']]
      : [['Visuel bon cadeau', data.giftVisual ? 'Oui' : 'Non']]),
    ['Total', `${total} €`],
    ['Langue du site', text(data.lang, 5).toUpperCase()],
  ]
  const html = `<div style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px">
<h2 style="color:#002654">${type === 'gift' ? 'Nouvelle demande de bon cadeau' : 'Nouvelle demande de réservation'}</h2>
<table cellpadding="6" style="border-collapse:collapse;width:100%">${rows.map(([label, value]) => `<tr><td style="border-bottom:1px solid #eee;color:#555;width:42%">${escapeHtml(label)}</td><td style="border-bottom:1px solid #eee;font-weight:bold">${escapeHtml(value)}</td></tr>`).join('')}</table>
<h3 style="color:#002654">Surfeurs</h3><ol>${surfers.map(([name, pkg]) => `<li>${escapeHtml(name || '(sans nom)')} — ${escapeHtml(pkg)}</li>`).join('')}</ol>
</div>`

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || 'Skeepskool <onboarding@resend.dev>',
      to: [process.env.MAIL_TO || 'skeepskool@hotmail.com'],
      subject: `${type === 'gift' ? 'Nouveau bon cadeau' : 'Nouvelle réservation'} — ${fullName} — ${surfers.length} surfeur${surfers.length > 1 ? 's' : ''} — ${total} €`,
      html,
      text: rows.map(([label, value]) => `${label} : ${value}`).join('\n'),
      ...(email ? { reply_to: email } : {}),
    }),
  }).catch(() => null)

  if (!response?.ok) return res.status(502).json({ ok: false, error: 'send_failed' })
  return res.status(200).json({ ok: true })
}
