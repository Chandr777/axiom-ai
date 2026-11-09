const legalLinks = [
  ['/privacy', 'Конфиденциальность'],
  ['/consent', 'Согласие на обработку'],
  ['/terms', 'Правила сайта'],
]

export default function SiteFooter() {
  return <footer className="site-footer">
    <p>© {new Date().getFullYear()} AXIOM AI · GEO / AEO consulting · <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a> · <a href="/llms.txt">llms.txt</a></p>
    <nav className="legal-footer-links" aria-label="Правовая информация">
      {legalLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
    </nav>
  </footer>
}