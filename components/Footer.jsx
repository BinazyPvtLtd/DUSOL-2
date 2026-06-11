import Link from 'next/link'

const mbaSpecializations = [
  ['Information Technology', 'information-technology'],
  ['Business Analytics', 'business-analytics'],
  ['Hospital Administration', 'hospital-administration-management'],
  ['International Trade', 'international-trade-management'],
  ['Rural Management', 'rural-management'],
  ['Retail Management', 'retail-management'],
  ['Business Management', 'business-management'],
  ['Project Management', 'project-management'],
  ['Marketing Management', 'marketing-management'],
]

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-cta">
              <h3>Interested?<br /><span>in Learning More</span></h3>
              <p>About DU SOL Distance &amp; Online Programs?</p>
              <Link href="/blogs" className="btn btn-gold">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>
                </svg>
                {' '}Request Callback
              </Link>
            </div>
            <div className="footer-col">
              <h4>UG Programs</h4>
              <ul>
                <li><Link href="/courses?c=distance-ba">Distance BA</Link></li>
                <li><Link href="/courses?c=distance-bba">Distance BBA</Link></li>
                <li><Link href="/courses?c=distance-bms">Distance BMS</Link></li>
                <li><Link href="/courses?c=distance-bcom">Distance BCom</Link></li>
                <li><Link href="/courses?c=online-ba">Online BA</Link></li>
                <li><Link href="/courses?c=online-bcom">Online BCom</Link></li>
              </ul>
              <h4 style={{ marginTop: '24px' }}>PG Programs</h4>
              <ul>
                <li><Link href="/courses?c=distance-ma">Distance MA</Link></li>
                <li><Link href="/courses?c=distance-mba">Distance MBA</Link></li>
                <li><Link href="/courses?c=distance-mcom">Distance MCom</Link></li>
                <li><Link href="/courses?c=distance-mlis">Distance MLIS</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>MBA Specialisations</h4>
              <ul className="two-col">
                {mbaSpecializations.map(([label, slug]) => (
                  <li key={slug}>
                    <Link href={`/courses?c=online-mba&s=${slug}`}>
                      {label} Management
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="footer-disclaimer">
            College Drishti acts as an information &amp; counselling service. All university names, logos and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the university before making decisions.
          </p>
        </div>
        <div className="footer-bottom">
          <div className="fb-links">
            <Link href="/">Disclaimer</Link>
            <span>|</span>
            <Link href="/">Privacy Policy</Link>
            <span>|</span>
            <Link href="/">Terms &amp; Conditions</Link>
          </div>
          <div>© 2026 DOSOLCOLLEGEDRISHTI · Powered by College Drishti. All Rights Reserved.</div>
        </div>
      </footer>

      <div className="float-cta">
        <a className="float-wa" href="https://wa.me/910123456789" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.9-1.7-2.2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.1-.3.2-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.2s1 2.5 1.1 2.6c.2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.3L2 22l4.8-1.4A10 10 0 1012 2z"/>
          </svg>
        </a>
        <a className="float-call" href="tel:01234567890" aria-label="Call">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>
          </svg>
        </a>
      </div>
    </>
  )
}
