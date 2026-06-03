   const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu   = document.getElementById('navbarMenu');
    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
        const expanded = navbarToggle.getAttribute('aria-expanded') === 'true';
        navbarToggle.setAttribute('aria-expanded', !expanded);
      });
    }

    // ─── Staggered gallery entrance ─────────────────
    document.querySelectorAll('.gallery-item').forEach((item, i) => {
      item.style.animationDelay = `${0.05 * i + 0.2}s`;
    });

    // ─── Filter tabs ─────────────────────────────────
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryEmpty = document.getElementById('galleryEmpty');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        let visible = 0;

        galleryItems.forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.style.display = match ? 'block' : 'none';
          if (match) visible++;
        });

        galleryEmpty.classList.toggle('visible', visible === 0);
      });
    });

    // ─── Lightbox ────────────────────────────────────
    const lightbox      = document.getElementById('lightbox');
    const lightboxImg   = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxTag   = document.getElementById('lightboxTag');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return; // placeholders don't open lightbox
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = item.dataset.title || '';
        lightboxTag.textContent   = item.dataset.tag   || '';
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });