export default function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <span className="tb-left">🎓 DU SOL Admission Open 2026 — Apply Now for Distance &amp; Online Programs!</span>
        <div className="tb-right">
          <a href="tel:01234567890">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>
            </svg>
            +91 01234567890
          </a>
          <div className="tb-social">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M22.5 6.2s-.3-1.8-1.1-2.6c-1-.9-2.1-1-2.6-1C16.2 2.5 12 2.5 12 2.5s-4.2 0-6.8.1c-.5.1-1.6.1-2.6 1-.8.8-1.1 2.6-1.1 2.6S1.2 8.2 1.2 10v1.7c0 1.8.3 3.7.3 3.7s.3 1.8 1.1 2.6c1 .9 2.4.9 3 .9C7.7 19 12 19 12 19s4.2 0 6.8-.1c.5-.1 1.6-.1 2.6-1 .8-.8 1.1-2.6 1.1-2.6s.3-1.8.3-3.7V10c0-1.8-.3-3.8-.3-3.8zM9.7 14.6V8.3l6.6 3.2-6.6 3.1z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.4a4 4 0 11-4.7-3.9A4 4 0 0116 11.4z" fill="none" stroke="white" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
