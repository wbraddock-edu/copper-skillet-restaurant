/* ============================================
   THE COPPER SKILLET — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---- Theme Toggle ----
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let currentTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML = currentTheme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    themeToggle.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateThemeIcon();
    });
  }

  // ---- Sticky Nav ----
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    window.addEventListener('scroll', () => {
      siteNav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ---- Mobile Menu ----
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      mobileBtn.classList.toggle('open', open);
      mobileBtn.setAttribute('aria-expanded', open.toString());
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileBtn.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Scroll Animations ----
  const animatedEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (animatedEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });
      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- Blog Search & Filter ----
  const blogSearch = document.getElementById('blog-search');
  const blogCards = document.querySelectorAll('.blog-card');
  const filterBtns = document.querySelectorAll('.blog-filter-btn');

  if (blogSearch && blogCards.length) {
    blogSearch.addEventListener('input', filterBlog);
  }

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterBlog();
      });
    });
  }

  function filterBlog() {
    const search = blogSearch ? blogSearch.value.toLowerCase() : '';
    const activeFilter = document.querySelector('.blog-filter-btn.active');
    const category = activeFilter ? activeFilter.dataset.category : 'all';

    blogCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const cardCategory = card.dataset.category || 'all';
      const matchesSearch = !search || text.includes(search);
      const matchesFilter = category === 'all' || cardCategory === category;
      card.style.display = matchesSearch && matchesFilter ? '' : 'none';
    });
  }

  // ---- Smooth Scroll for anchors ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Reservation form ----
  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = reservationForm.querySelector('[type="submit"]');
      const original = submitBtn.textContent;
      submitBtn.textContent = 'Request Sent!';
      submitBtn.disabled = true;
      submitBtn.style.background = 'var(--color-secondary)';
      setTimeout(() => {
        submitBtn.textContent = original;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        reservationForm.reset();
      }, 3000);
    });
  }

  // ---- Contact form ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.textContent = 'Message Sent!';
      submitBtn.disabled = true;
      submitBtn.style.background = 'var(--color-secondary)';
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ---- Menu Category Tabs ----
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuCategories = document.querySelectorAll('.menu-category');

  if (menuTabBtns.length && menuCategories.length) {
    menuTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        menuTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.dataset.category;
        menuCategories.forEach(cat => {
          cat.style.display = (target === 'all' || cat.dataset.category === target) ? '' : 'none';
        });
      });
    });
  }

})();
