/**
 * Brain Clarity — Cookie Banner
 * DSGVO/GDPR compliant. Bilingual DE/EN via page lang attribute.
 * No external dependencies.
 */
(function () {
  const STORAGE_KEY = 'bc_cookie_consent';

  // Don't show if already decided
  if (localStorage.getItem(STORAGE_KEY)) return;

  const isDE = document.documentElement.lang.toLowerCase().startsWith('de');

  const text = isDE
    ? 'Wir verwenden ausschließlich technisch notwendige Cookies, um den Betrieb dieser Website zu gewährleisten. Es werden keine Tracking- oder Analyse-Cookies gesetzt.'
    : 'We only use strictly necessary cookies required to operate this website. No tracking or analytics cookies are used.';

  const acceptLabel = isDE ? 'Verstanden' : 'Got it';
  const declineLabel = isDE ? 'Ablehnen' : 'Decline';
  const privacyLabel = isDE ? 'Datenschutz' : 'Privacy';
  const privacyHref = isDE ? '/datenschutz.html' : '/en/privacy.html';

  const banner = document.createElement('div');
  banner.id = 'bc-cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', isDE ? 'Cookie-Hinweis' : 'Cookie notice');
  banner.innerHTML = `
    <p>${text} <a href="${privacyHref}">${privacyLabel}</a></p>
    <div class="bc-cookie-actions">
      <button id="bc-cookie-decline">${declineLabel}</button>
      <button id="bc-cookie-accept">${acceptLabel}</button>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #bc-cookie-banner {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      width: min(600px, calc(100vw - 32px));
      background: #12151c;
      border: 1px solid rgba(139, 92, 246, 0.25);
      border-radius: 14px;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      z-index: 9999;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      color: #b0b8cc;
      flex-wrap: wrap;
    }
    #bc-cookie-banner p {
      flex: 1;
      min-width: 200px;
      margin: 0;
      line-height: 1.5;
    }
    #bc-cookie-banner a {
      color: #8b5cf6;
      text-decoration: underline;
    }
    .bc-cookie-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    #bc-cookie-decline {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.15);
      color: #b0b8cc;
      border-radius: 8px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 13px;
      transition: border-color 0.2s;
    }
    #bc-cookie-decline:hover { border-color: rgba(255,255,255,0.35); }
    #bc-cookie-accept {
      background: #7c3aed;
      border: none;
      color: #fff;
      border-radius: 8px;
      padding: 8px 18px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: background 0.2s;
    }
    #bc-cookie-accept:hover { background: #6d28d9; }
  `;

  document.head.appendChild(style);
  document.body.appendChild(banner);

  function dismiss(value) {
    localStorage.setItem(STORAGE_KEY, value);
    banner.style.transition = 'opacity 0.3s, transform 0.3s';
    banner.style.opacity = '0';
    banner.style.transform = 'translateX(-50%) translateY(16px)';
    setTimeout(() => banner.remove(), 350);
  }

  document.getElementById('bc-cookie-accept').addEventListener('click', () => dismiss('accepted'));
  document.getElementById('bc-cookie-decline').addEventListener('click', () => dismiss('declined'));
})();
