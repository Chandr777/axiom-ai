import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'

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
  if (body.personalDataConsent !== true) {
    return respond(res, 400, { error: 'Для отправки заявки необходимо дать отдельное согласие на обработку данных.' })
  }

  const company = clean(body.company, 120)
  const website = clean(body.website, 300)
  const contact = clean(body.contact, 254)
  const normalizedWebsite = /^https?:\/\//i.test(website) ? website : `https://${website}`
  let parsedWebsite
  try {
    parsedWebsite = new URL(normalizedWebsite)
  } catch {
    return respond(res, 400, { error: 'Check the company website URL' })
  }

  if (!company || !contact || !['http:', 'https:'].includes(parsedWebsite.protocol)) {
    return respond(res, 400, { error: 'Проверьте обязательные поля формы.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
    return respond(res, 400, { error: 'Укажите корректный email для связи.' })
  }
  if (isIP(parsedWebsite.hostname) || !parsedWebsite.hostname.includes('.')) {
    return respond(res, 400, { error: 'Введите домен сайта, например example.ru.' })
  }

  try {
    const addresses = await lookup(parsedWebsite.hostname, { all: true })
    if (addresses.length === 0) {
      return respond(res, 400, { error: 'Домен не найден. Проверьте адрес сайта.' })
    }
  } catch (error) {
    if (['ENOTFOUND', 'ENODATA', 'EAI_NONAME'].includes(error.code)) {
      return respond(res, 400, { error: 'Домен не найден. Проверьте адрес сайта.' })
    }
    console.error('Website domain lookup failed', error.code || error)
    return respond(res, 503, { error: 'Не удалось проверить домен. Попробуйте отправить заявку позже.' })
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
    `Согласие на обработку данных: да (${new Date().toISOString()})`,
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
