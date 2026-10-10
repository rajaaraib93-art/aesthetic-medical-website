/**
 * Builds a WhatsApp deep link from whatever is stored in Sanity siteSettings.
 * Accepts a full https:// link or a phone number. Numbers starting with a
 * single 0 are treated as Pakistani numbers (0 -> 92). Returns null when
 * there is nothing usable, so callers can hide the button.
 */
export function whatsappHref(raw: string | null | undefined, message: string): string | null {
  if (!raw) return null
  const text = encodeURIComponent(message)
  if (/^https?:\/\//i.test(raw)) {
    return raw + (raw.includes('?') ? '&' : '?') + 'text=' + text
  }
  let digits = raw.replace(/\D/g, '')
  if (!digits) return null
  if (digits.startsWith('00')) digits = digits.slice(2)
  else if (digits.startsWith('0')) digits = '92' + digits.slice(1)
  return `https://wa.me/${digits}?text=${text}`
}

export function telHref(raw: string | null | undefined): string | null {
  if (!raw) return null
  const cleaned = raw.replace(/[^\d+]/g, '')
  return cleaned ? `tel:${cleaned}` : null
}
