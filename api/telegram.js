const MAX_BODY_BYTES = 10_000

function respond(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return respond(res, 405, { error: 'Method not allowed' })
  }

  const origin = req.headers.origin
  const host = req.headers.host
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return respond(res, 403, { error: 'Forbidden' })
    } catch {
      return respond(res, 403, { error: 'Forbidden' })
    }
  }

  const contentLength = Number(req.headers['content-length'] || 0)
  if (contentLength > MAX_BODY_BYTES) return respond(res, 413, { error: 'Request too large' })

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return respond(res, 400, { error: 'Invalid request' })
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return respond(res, 400, { error: 'Invalid request' })
  }

  // Honeypot: respond with success to bots without sending a notification.
  if (clean(body.websiteConfirm, 300)) return respond(res, 200, { ok: true })

  const company = clean(body.company, 120)
  const website = clean(body.website, 300)
  const contact = clean(body.contact, 254)
  let parsedWebsite
  try {
    parsedWebsite = new URL(website)
  } catch {
    return respond(res, 400, { error: 'Check the company website URL' })
  }

  if (!company || !contact || !['http:', 'https:'].includes(parsedWebsite.protocol)) {
    return respond(res, 400, { error: 'Check the required fields' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
    return respond(res, 400, { error: 'Check the contact email' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.error('Telegram notification is not configured')
    return respond(res, 503, { error: 'Service is temporarily unavailable' })
  }

  const message = [
    'Новая заявка на бесплатный GEO/AEO-отчёт',
    '',
    `Компания: ${company}`,
    `Сайт: ${parsedWebsite.href}`,
    `Контакт: ${contact}`,
  ].join('\n')

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: true }),
    })
    if (!telegramResponse.ok) {
      console.error('Telegram rejected an audit notification', telegramResponse.status)
      return respond(res, 502, { error: 'Could not deliver the request' })
    }
  } catch (error) {
    console.error('Telegram notification request failed', error)
    return respond(res, 502, { error: 'Could not deliver the request' })
  }

  return respond(res, 200, { ok: true })
}
