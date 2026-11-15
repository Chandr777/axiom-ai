import audit from './services/geo-audit.js'
import promotion from './services/geo-promotion.js'
import aeo from './services/aeo.js'
import monitoring from './services/ai-visibility-monitoring.js'

export const serviceCatalog = [audit, promotion, aeo, monitoring]
export const serviceContentSources = serviceCatalog.map(service => `src/content/services/${service.slug}.js`)
export const servicePath = (slug, lang = 'ru') => `${lang === 'en' ? '/en' : ''}/services/${slug}`
export function serviceForPath(path) {
  return serviceCatalog.find(service => path === servicePath(service.slug) || path === servicePath(service.slug, 'en'))
}
