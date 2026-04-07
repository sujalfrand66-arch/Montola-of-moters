/* ============================================================
   MONTULA MOTORS — MAIN JS
   main.js — Shared utilities loaded on every page
   ============================================================ */

(function () {
  'use strict';

  // ── Smooth Anchor Scrolling ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Custom Cursor (desktop only) ──────────────────────────
  if (window.matchMedia('(pointer:fine)').matches) {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    const dot  = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    // Ring follows with lag
    (function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(animateRing);
    })();

    // Hover magnify on interactive elements
    const hoverTargets = 'a, button, .project-card, .gallery-item, .service-block';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        cursor.classList.add('hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        cursor.classList.remove('hover');
      }
    });
  }

  // ── Add cursor styles dynamically ─────────────────────────
  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `
    * { cursor: none !important; }
    #custom-cursor { position: fixed; top: 0; left: 0; z-index: 99999; pointer-events: none; }
    .cursor-dot {
      position: fixed; top: -4px; left: -4px;
      width: 8px; height: 8px;
      background: #c9a84c;
      border-radius: 50%;
      will-change: transform;
    }
    .cursor-ring {
      position: fixed; top: -18px; left: -18px;
      width: 36px; height: 36px;
      border: 1px solid rgba(201,168,76,0.5);
      border-radius: 50%;
      will-change: transform;
      transition: width 0.3s, height 0.3s, opacity 0.3s, border-color 0.3s, top 0.3s, left 0.3s;
    }
    #custom-cursor.hover .cursor-ring {
      width: 60px; height: 60px;
      top: -30px; left: -30px;
      border-color: rgba(201,168,76,0.8);
    }
    @media (pointer: coarse) {
      * { cursor: auto !important; }
      #custom-cursor { display: none; }
    }
  `;
  document.head.appendChild(cursorStyle);

  // ── Current Year for Footer ───────────────────────────────
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // ── Lazy Load Images ──────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach((img) => imgObserver.observe(img));
  }

})();
