/* Shared nav/footer HTML injection */
const NAV_HTML = `
<nav class="site-nav" role="navigation" aria-label="Main navigation">
  <div class="site-nav__inner">
    <a href="index.html" class="site-nav__logo" aria-label="The Copper Skillet home">
      <svg class="site-nav__logo-mark" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle cx="22" cy="22" r="20" fill="currentColor" opacity="0.12"/>
        <path d="M12 28 C12 28 14 18 22 18 C30 18 32 28 32 28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M10 28 L34 28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M22 18 L22 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 12 L26 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      <div class="site-nav__logo-text">
        <span class="site-nav__logo-name">The Copper Skillet</span>
        <span class="site-nav__logo-tagline">Southern Comfort · Pulaski, VA</span>
      </div>
    </a>
    <ul class="site-nav__links" role="list">
      <li><a href="index.html">Home</a></li>
      <li><a href="menu.html">Menu</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="events.html">Events</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="reservation.html" class="nav-cta">Reserve a Table</a></li>
    </ul>
    <div class="site-nav__controls">
      <button class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode"></button>
      <button class="mobile-menu-btn" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" role="menu">
    <a href="index.html">Home</a>
    <a href="menu.html">Menu</a>
    <a href="about.html">Our Story</a>
    <a href="events.html">Events &amp; Specials</a>
    <a href="blog.html">Blog</a>
    <a href="contact.html">Contact</a>
    <a href="reservation.html" class="nav-cta">Reserve a Table</a>
  </div>
</nav>`;
