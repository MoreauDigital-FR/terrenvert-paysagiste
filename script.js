// Terravia Paysage — interactions
(() => {
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');

  // Header style on scroll
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });

  // Gallery filters
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.gallery__item');
  filters.forEach((btn) => btn.addEventListener('click', () => {
    filters.forEach((b) => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', String(b === btn)); });
    const f = btn.dataset.filter;
    items.forEach((it) => it.classList.toggle('is-hidden', f !== 'all' && it.dataset.cat !== f));
  }));

  // Two-path cards preselect project type
  const projet = document.getElementById('projet');
  document.querySelectorAll('.path[data-subject]').forEach((p) =>
    p.addEventListener('click', () => { projet.value = p.dataset.subject; })
  );

  // Form (démo : pas d'envoi réel)
  const form = document.getElementById('devis-form');
  const note = form.querySelector('.form__note');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const valid = f.type === 'checkbox' ? f.checked : f.checkValidity() && f.value.trim() !== '';
      f.classList.toggle('is-invalid', !valid);
      if (!valid) ok = false;
    });
    note.className = 'form__note';
    if (!ok) {
      note.textContent = 'Merci de compléter les champs obligatoires.';
      note.classList.add('is-error');
      return;
    }
    note.textContent = 'Merci ! Votre demande a bien été envoyée. Nous vous rappelons sous 24 h ouvrées.';
    note.classList.add('is-success');
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
