/* ============================================================
   MONTULA MOTORS — SCROLL ANIMATIONS
   animations.js — IntersectionObserver reveal system
   ============================================================ */

(function () {
  'use strict';

  // ── Reveal on Scroll ──────────────────────────────────────
  const revealTargets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .stagger-children, .img-reveal, .line-draw'
  );

  const revealOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target); // Only trigger once
      }
    });
  }, revealOptions);

  revealTargets.forEach((el) => revealObserver.observe(el));

  // ── Counter Animation ─────────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased  = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => counterObserver.observe(el));

  // ── Testimonials Slider ───────────────────────────────────
  const track  = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots   = document.querySelectorAll('.testimonial-dot');
  const btnPrev = document.querySelector('.testimonial-btn-prev');
  const btnNext = document.querySelector('.testimonial-btn-next');

  let current = 0;
  let autoSlide;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    if (track) track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (track && slides.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
    });

    if (btnNext) btnNext.addEventListener('click', () => { goToSlide(current + 1); resetAutoSlide(); });
    if (btnPrev) btnPrev.addEventListener('click', () => { goToSlide(current - 1); resetAutoSlide(); });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { goToSlide(current + 1); resetAutoSlide(); }
      if (e.key === 'ArrowLeft')  { goToSlide(current - 1); resetAutoSlide(); }
    });

    function startAutoSlide() {
      autoSlide = setInterval(() => goToSlide(current + 1), 5500);
    }

    function resetAutoSlide() {
      clearInterval(autoSlide);
      startAutoSlide();
    }

    goToSlide(0);
    startAutoSlide();
  }

  // ── Gallery Lightbox ──────────────────────────────────────
  const lightbox      = document.querySelector('.lightbox');
  const lightboxImg   = document.querySelector('.lightbox img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryItems  = document.querySelectorAll('.gallery-item');

  if (lightbox && lightboxImg) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const src = item.querySelector('img')?.src;
        if (src) {
          lightboxImg.src = src;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  // ── Page Loader ───────────────────────────────────────────
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1800);
    });
  }

})();
