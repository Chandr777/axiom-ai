import { useLocation } from 'react-router-dom'
import { serviceCatalog, servicePath } from './content/serviceCatalog'

const legalLinks = [
  ['/privacy', 'Конфиденциальность'],
  ['/consent', 'Согласие на обработку'],
  ['/terms', 'Правила сайта'],
]

export default function SiteFooter() {
  const en = useLocation().pathname.startsWith('/en')
  return <footer className="site-footer">
    <p>© {new Date().getFullYear()} Axiom AI (axiom-ai.su), {en ? 'GEO agency' : 'GEO-агентство'} · <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a></p>
    <nav className="legal-footer-links" aria-label={en ? 'Services' : 'Услуги'}>{serviceCatalog.map(service => <a key={service.slug} href={servicePath(service.slug, en ? 'en' : 'ru')}>{service[en ? 'en' : 'ru'].label}</a>)}</nav>
    <nav className="legal-footer-links" aria-label={en ? 'Company and research' : 'Компания и исследования'}>
      <a href={en ? '/en/about' : '/about'}>{en ? 'About' : 'О компании'}</a>
      <a href={en ? '/en/contacts' : '/contacts'}>{en ? 'Contact' : 'Контакты'}</a>
      <a href={en ? '/en/blog' : '/blog'}>{en ? 'Research and articles' : 'Исследования и статьи'}</a>
      <a href="/llms.txt">llms.txt</a><a href="/llms-full.txt">llms-full.txt</a>
    </nav>
    <nav className="legal-footer-links" aria-label={en ? 'Legal information (Russian)' : 'Правовая информация'}>
      {legalLinks.map(([href, label]) => <a key={href} href={href} lang="ru">{label}</a>)}
    </nav>
  </footer>
}
