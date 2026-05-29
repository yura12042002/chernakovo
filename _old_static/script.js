/* ============================================================
   ООО «ЧЕРНАКОВО» — интерактив и анимации
   Чистый ванильный JS, без зависимостей
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Прелоадер ---------- */
  window.addEventListener('load', () => {
    const pre = $('#preloader');
    if (!pre) return;
    setTimeout(() => pre.classList.add('is-done'), reduceMotion ? 0 : 650);
  });

  /* ---------- Год в подвале ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Шапка + прогресс скролла ---------- */
  const header = $('#header');
  const progress = $('#scrollProgress');
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Бургер-меню ---------- */
  const burger = $('#burger');
  const nav = $('#nav');
  const toggleNav = (open) => {
    const willOpen = open ?? !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', willOpen);
    burger.classList.toggle('is-open', willOpen);
    burger.setAttribute('aria-expanded', String(willOpen));
    document.body.style.overflow = willOpen ? 'hidden' : '';
  };
  if (burger && nav) {
    burger.addEventListener('click', () => toggleNav());
    $$('.nav__link', nav).forEach((l) => l.addEventListener('click', () => toggleNav(false)));
  }

  /* ---------- Генерация поля колосьев ---------- */
  const strip = $('.wheat-strip');
  if (strip && !reduceMotion) {
    const wheatSVG = (h) => `
      <svg viewBox="0 0 40 ${h}" width="${24 + Math.random() * 16}" height="${h * 1.7}" aria-hidden="true">
        <path d="M20 ${h} L20 ${h * 0.34}" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M20 ${h * 0.5} q-11 -4 -15 -16 q11 0 15 9 Z" fill="currentColor"/>
        <path d="M20 ${h * 0.5} q11 -4 15 -16 q-11 0 -15 9 Z" fill="currentColor"/>
        <path d="M20 ${h * 0.38} q-9 -3 -12 -14 q9 0 12 8 Z" fill="currentColor"/>
        <path d="M20 ${h * 0.38} q9 -3 12 -14 q-9 0 -12 8 Z" fill="currentColor"/>
        <path d="M20 ${h * 0.27} q-7 -2 -9 -11 q7 0 9 6 Z" fill="currentColor"/>
        <path d="M20 ${h * 0.27} q7 -2 9 -11 q-7 0 -9 6 Z" fill="currentColor"/>
      </svg>`;
    const count = Math.min(46, Math.floor(window.innerWidth / 26));
    let html = '';
    for (let i = 0; i < count; i++) {
      const left = (i / count) * 100 + (Math.random() * 2 - 1);
      const h = 50 + Math.random() * 40;
      const dur = (2.8 + Math.random() * 2.4).toFixed(2);
      const del = (-Math.random() * 3).toFixed(2);
      const rot = (3 + Math.random() * 4).toFixed(1);
      const z = Math.random() > 0.5 ? 2 : 1;
      const shade = 0.7 + Math.random() * 0.3;
      html += `<span class="wheat" style="left:${left}%;--dur:${dur}s;--del:${del}s;--rot:-${rot}deg;z-index:${z};opacity:${shade.toFixed(2)}">${wheatSVG(h)}</span>`;
    }
    strip.innerHTML = html;
  }

  /* ---------- Падающие зёрна ---------- */
  const grainBox = $('#heroGrain');
  if (grainBox && !reduceMotion) {
    const n = 22;
    let html = '';
    for (let i = 0; i < n; i++) {
      const left = Math.random() * 100;
      const dur = (6 + Math.random() * 7).toFixed(2);
      const del = (-Math.random() * 10).toFixed(2);
      const scale = (0.6 + Math.random() * 0.8).toFixed(2);
      html += `<span class="grain" style="left:${left}%;animation-duration:${dur}s;animation-delay:${del}s;transform:scale(${scale})"></span>`;
    }
    grainBox.innerHTML = html;
  }

  /* ---------- Scroll-reveal ---------- */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.delay || '0', 10);
          setTimeout(() => e.target.classList.add('is-visible'), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Счётчики ---------- */
  const fmt = (n) => n.toLocaleString('ru-RU');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = fmt(target) + suffix; return; }
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = fmt(Math.floor(eased * target)) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target) + suffix;
    };
    requestAnimationFrame(tick);
  };
  const counters = $$('.stat__num');
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Лёгкий параллакс героя ---------- */
  const sun = $('.hero__sun');
  const hills = $('.hero__hills');
  if (sun && !reduceMotion) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        sun.style.transform = `translateY(${y * 0.25}px)`;
        if (hills) hills.style.transform = `translateY(${y * 0.08}px)`;
      }
    }, { passive: true });
  }

  /* ---------- Форма ---------- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = $('#formNote');
      const name = $('#name').value.trim();
      const phone = $('#phone').value.trim();
      if (!name || !phone) {
        [['#name', name], ['#phone', phone]].forEach(([sel, val]) => {
          $(sel).style.borderColor = val ? '' : '#e0a92e';
        });
        return;
      }
      if (note) { note.hidden = false; }
      form.querySelector('button').textContent = 'Отправлено ✓';
      setTimeout(() => form.reset(), 400);
    });
  }
})();
