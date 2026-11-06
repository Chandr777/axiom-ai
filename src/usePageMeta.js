import { useEffect } from 'react'

export default function usePageMeta(title, description, path) {
  useEffect(() => {
    document.title = title

    function setMeta(selector, attribute, value) {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, value)
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    }

    setMeta('meta[name="description"]', 'name', description)
    setMeta('meta[property="og:title"]', 'property', title)
    setMeta('meta[property="og:description"]', 'property', description)
    setMeta('meta[property="og:url"]', 'property', `https://axiom-ai.su${path}`)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://axiom-ai.su${path}`
  }, [title, description, path])
}
