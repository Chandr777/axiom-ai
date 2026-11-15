import { useEffect } from 'react'
import { baseUrl, getPage, languageAlternates } from './siteData'

export default function usePageMeta(title, description, path) {
  useEffect(() => {
    const page = getPage(path)
    const pageTitle = page?.title || title
    const pageDescription = page?.description || description
    document.title = pageTitle
    document.documentElement.lang = page?.lang || 'ru'

    function setMeta(selector, attribute, value) {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        const key = selector.match(/\[(?:name|property)="([^"]+)"\]/)?.[1]
        if (key) element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    }

    setMeta('meta[name="description"]', 'name', pageDescription)
    setMeta('meta[property="og:title"]', 'property', pageTitle)
    setMeta('meta[property="og:description"]', 'property', pageDescription)
    setMeta('meta[property="og:url"]', 'property', `${baseUrl}${path}`)
    setMeta('meta[property="og:locale"]', 'property', page?.lang === 'en' ? 'en_US' : 'ru_RU')
    setMeta('meta[name="twitter:title"]', 'name', pageTitle)
    setMeta('meta[name="twitter:description"]', 'name', pageDescription)
    document.head.querySelectorAll('link[hreflang]').forEach(link => link.remove())
    languageAlternates(page).forEach(alternate => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = alternate.lang
      link.href = `${baseUrl}${alternate.path}`
      document.head.appendChild(link)
    })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://www.axiom-ai.su${path}`
  }, [title, description, path])
}
