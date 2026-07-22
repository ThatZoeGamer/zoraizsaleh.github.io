document.addEventListener('DOMContentLoaded', function () {
  // ─── Navbar toggle ───────────────────────────────
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function () {
      navbarToggle.classList.toggle('is-active');
      navbarMenu.classList.toggle('is-active');
      const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
      navbarToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when a link is clicked (mobile)
    navbarMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        navbarToggle.classList.remove('is-active');
        navbarMenu.classList.remove('is-active');
        navbarToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Scroll-reveal for skill tags ────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.skill-tag').forEach((tag, i) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(12px)';
    tag.style.transition = `opacity 0.4s ease ${0.05 * i + 0.5}s, transform 0.4s ease ${0.05 * i + 0.5}s, border-color 0.3s, color 0.3s`;
    observer.observe(tag);
  });

  // ─── Navbar scroll effect ─────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.borderBottomColor = 'rgba(255,255,255,0.1)';
    } else {
      navbar.style.borderBottomColor = 'rgba(255,255,255,0.07)';
    }
  }, { passive: true });
});
// ─── Page Transitions ─────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // Create the overlay element
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: #0a0a0f;
    z-index: 99999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  document.body.appendChild(overlay);

  // Fade in on page load
  requestAnimationFrame(() => {
    overlay.style.opacity = '0';
  });

  // Intercept all local link clicks
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only internal links (not anchors, not external)
    if (!href.startsWith('#') && !href.startsWith('http') && href !== '') {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.href;

        // Fade out, then navigate
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
        setTimeout(() => {
          window.location.href = target;
        }, 350);
      });
    }
  });
});
