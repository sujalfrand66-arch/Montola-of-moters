/* ============================================================
   MANTOLA OF MOTORS — HERO ANIMATION
   hero.js — Cinematic entrance sequence
   ============================================================ */
(function () {
  'use strict';

  function initHero() {
    const label      = document.querySelector('.hero-label');
    const titleLines = document.querySelectorAll('.title-line');
    const brandName  = document.querySelector('.hero-brand-name');
    const subtitle   = document.querySelector('.hero-subtitle');
    const ctaRow     = document.querySelector('.hero-cta-row');
    const scrollInd  = document.querySelector('.scroll-indicator');

    if (!label) return;

    // Trigger entrance classes after page load
    setTimeout(() => { label && label.classList.add('animate'); }, 500);
    titleLines.forEach((line) => {
      setTimeout(() => line.classList.add('animate'), 800);
    });
    setTimeout(() => { brandName && brandName.classList.add('animate'); }, 1100);
    setTimeout(() => { subtitle && subtitle.classList.add('animate'); }, 1350);
    setTimeout(() => { ctaRow && ctaRow.classList.add('animate'); }, 1500);
    setTimeout(() => { scrollInd && scrollInd.classList.add('animate'); }, 1700);
  }

  // Wait for loader, then init
  const loader = document.getElementById('page-loader');
  if (loader) {
    const obs = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.target.classList.contains('hidden')) {
          obs.disconnect();
          initHero();
        }
      });
    });
    obs.observe(loader, { attributes: true, attributeFilter: ['class'] });
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initHero);
    } else {
      initHero();
    }
  }
})();
