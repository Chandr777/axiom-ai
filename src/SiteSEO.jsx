import { useLocation } from 'react-router-dom'
import { baseUrl, organizationId, brandDescription, getPage, breadcrumbItems, plans } from './siteData'
import usePageMeta from './usePageMeta'

export function pageSchema(page) {
  if (!page) return null
  const url = `${baseUrl}${page.path}`
  const en = page.lang === 'en'
  const organization = {
    '@type': 'Organization', '@id': organizationId, name: 'Axiom AI', alternateName: brandDescription,
    url: `${baseUrl}/`, logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png`, width: 512, height: 512 },
    description: 'Axiom AI (axiom-ai.su), GEO-агентство: технический аудит, контент для ответных систем и измерение AI-видимости.',
    email: 'info@axiom-ai.su', sameAs: ['https://github.com/Chandr777/axiom-ai'],
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'info@axiom-ai.su', availableLanguage: ['Russian', 'English'] },
  }
  const graph = [organization,
    { '@type': 'WebSite', '@id': `${baseUrl}/#website`, url: `${baseUrl}/`, name: 'Axiom AI (axiom-ai.su)', inLanguage: ['ru', 'en'], publisher: { '@id': organizationId } },
    { '@type': page.path.endsWith('/about') ? 'AboutPage' : page.path.endsWith('/contacts') ? 'ContactPage' : page.path.endsWith('/blog') ? 'CollectionPage' : 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: page.lang, isPartOf: { '@id': `${baseUrl}/#website` }, about: { '@id': organizationId } },
  ]
  const items = breadcrumbItems(page)
  if (items.length) graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumbs`, itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: `${baseUrl}${item.path}` })) })
  if (/\/(services|pricing)$/.test(page.path)) {
    const offers = plans.map(plan => ({
      '@type': 'Offer', '@id': `${baseUrl}/pricing#${plan.id}-offer`, name: plan.name,
      url: `${baseUrl}${en ? '/en' : ''}/pricing#${plan.id}`, priceCurrency: 'RUB',
      ...(plan.min === plan.max ? { price: plan.min } : {}),
      description: en ? plan.en : plan.ru, seller: { '@id': organizationId },
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'RUB', ...(plan.min === plan.max ? { price: plan.min } : { minPrice: plan.min, maxPrice: plan.max }), description: en ? plan.en : plan.ru },
      itemOffered: { '@type': 'Service', '@id': `${baseUrl}/services#${plan.id}`, name: plan.name, serviceType: 'GEO / AEO', provider: { '@id': organizationId } },
    }))
    graph.push({ '@type': 'Service', '@id': `${baseUrl}/services#geo-aeo`, name: en ? 'GEO and AEO services' : 'Услуги GEO и AEO', serviceType: 'Generative Engine Optimization / Answer Engine Optimization', url: `${baseUrl}${en ? '/en' : ''}/services`, provider: { '@id': organizationId }, offers })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export default function SiteSEO() {
  const { pathname } = useLocation()
  usePageMeta('', '', pathname)
  const schema = pageSchema(getPage(pathname))
  return schema ? <script type="application/ld+json" data-site-schema>{JSON.stringify(schema).replace(/</g, '\\u003c')}</script> : null
}
