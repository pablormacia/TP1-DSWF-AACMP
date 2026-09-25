const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');
if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

/* Bitácora: al tocar una entrada, el diamante responde con un brillo breve.
   Se usa click (toque confirmado) para no reaccionar al arrastrar con el dedo;
   con mouse alcanza el :hover del CSS. */
document.querySelectorAll('.log-entry').forEach(entry => {
  let pointerType = 'mouse';
  let timer;
  entry.addEventListener('pointerdown', event => { pointerType = event.pointerType; });
  entry.addEventListener('click', () => {
    if (pointerType === 'mouse') return;
    clearTimeout(timer);
    entry.classList.add('is-pressed');
    timer = setTimeout(() => entry.classList.remove('is-pressed'), 220);
  });
});

const teamGrid = document.querySelector('#team-grid');
const memberCards = teamGrid ? [...teamGrid.querySelectorAll('.member-card')] : [];

/* ---------- Tarjetas con giro (flip) en mobile ----------
   La misma consulta que usa el CSS decide el modo: pantallas angostas o
   dispositivos táctiles sin hover. En desktop la tarjeta completa sigue siendo
   un enlace al perfil y la cara frontal no se muestra. */
const flipMode = window.matchMedia('(max-width: 700px), (hover: none) and (pointer: coarse)');

function setFlipped(card, flipped) {
  const front = card.querySelector('.card-front');
  const back = card.querySelector('.card-back');
  card.classList.toggle('is-flipped', flipped);
  front.setAttribute('aria-expanded', String(flipped));
  // inert saca del teclado y del lector de pantalla la cara que no se ve.
  front.inert = flipMode.matches && flipped;
  back.inert = flipMode.matches && !flipped;
}

function resetCards() {
  // Si el foco estaba dentro de una tarjeta, lo conservamos en su control visible
  // (al cambiar de modo, la cara que lo tenía puede volverse inerte).
  const focusedCard = document.activeElement && document.activeElement.closest('.member-card');
  memberCards.forEach(card => setFlipped(card, false));
  if (focusedCard) {
    const target = focusedCard.querySelector(flipMode.matches ? '.card-front' : '.card-link');
    if (document.activeElement !== target) target.focus({ preventScroll: true });
  }
}

memberCards.forEach(card => {
  const front = card.querySelector('.card-front');
  const back = card.querySelector('.card-back');

  front.addEventListener('click', () => {
    // Solo una tarjeta girada a la vez.
    memberCards.forEach(other => { if (other !== card) setFlipped(other, false); });
    setFlipped(card, true);
    card.querySelector('.card-link').focus({ preventScroll: true });
  });

  // Tocar el dorso (fuera del enlace) o su botón ↺ vuelve a la cara frontal.
  back.addEventListener('click', event => {
    if (!flipMode.matches || event.target.closest('.card-link')) return;
    setFlipped(card, false);
    front.focus({ preventScroll: true });
  });

  back.addEventListener('keydown', event => {
    if (event.key === 'Escape' && card.classList.contains('is-flipped')) {
      setFlipped(card, false);
      front.focus({ preventScroll: true });
    }
  });
});

resetCards();
flipMode.addEventListener('change', resetCards);

/* ---------- Mezclar tarjetas ---------- */
const shuffleControl = document.querySelector('#shuffle-team');
const shuffleStatus = document.querySelector('#shuffle-status');

function mezclarTarjetas() {
  resetCards();
  [...memberCards].sort(() => Math.random() - 0.5).forEach((card, index) => {
    teamGrid.appendChild(card);
    // Cada tarjeta tiene su número en la cara frontal y en el dorso.
    card.querySelectorAll('.card-index').forEach(number => {
      number.textContent = String(index + 1).padStart(2, '0');
    });
  });
  // Breve respuesta visual en la grilla y aviso para lectores de pantalla.
  teamGrid.classList.remove('is-shuffled');
  void teamGrid.offsetWidth;
  teamGrid.classList.add('is-shuffled');
  if (shuffleStatus) {
    const nombres = [...teamGrid.querySelectorAll('.card-body h3')].map(h => h.textContent);
    shuffleStatus.textContent = 'Tarjetas mezcladas. Nuevo orden: ' + nombres.join(', ') + '.';
  }
}

/* Slider: el ícono se arrastra con Pointer Events (mouse, touch y lápiz).
   Si llega al final y se suelta, mezcla; siempre vuelve al inicio.
   Click, Enter y Espacio funcionan porque el control es un <button>. */
if (shuffleControl && teamGrid) {
  const knob = shuffleControl.querySelector('.shuffle-knob');
  let startX = 0;
  let offset = 0;
  let dragging = false;
  let dragged = false;
  let ignoreClickUntil = 0;

  const maxOffset = () => shuffleControl.clientWidth - knob.offsetWidth - 8;

  function moveKnob(value) {
    offset = Math.max(0, Math.min(value, maxOffset()));
    shuffleControl.style.setProperty('--knob-x', offset + 'px');
    shuffleControl.style.setProperty('--progress', (offset / maxOffset()).toFixed(3));
  }

  shuffleControl.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    dragging = true;
    dragged = false;
    startX = event.clientX;
    shuffleControl.setPointerCapture(event.pointerId);
    shuffleControl.classList.add('is-dragging');
  });

  shuffleControl.addEventListener('pointermove', event => {
    if (!dragging) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 4) dragged = true;
    moveKnob(distance);
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    shuffleControl.classList.remove('is-dragging');
    if (dragged) {
      // El click que el navegador dispara al soltar no debe mezclar otra vez.
      ignoreClickUntil = Date.now() + 400;
      if (offset >= maxOffset() - 2) confirmarMezcla();
    }
    moveKnob(0); // vuelve suavemente al inicio (transición CSS)
  }

  function confirmarMezcla() {
    mezclarTarjetas();
    shuffleControl.classList.add('is-done');
    setTimeout(() => shuffleControl.classList.remove('is-done'), 450);
  }

  shuffleControl.addEventListener('pointerup', endDrag);
  shuffleControl.addEventListener('pointercancel', endDrag);

  shuffleControl.addEventListener('click', () => {
    if (Date.now() < ignoreClickUntil) return;
    confirmarMezcla();
  });
}

// ScrollSpy para el Navbar (resaltar sección activa)
const navLinks = document.querySelectorAll('.main-nav a');
const equipoSection = document.getElementById('equipo');

if (equipoSection && navLinks.length > 0) {
  window.addEventListener('scroll', () => {
    // Si scrolleamos hasta la seccion equipo (con un margen de 250px)
    if (window.scrollY >= equipoSection.offsetTop - 250) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });
      const equipoLink = document.querySelector('.main-nav a[href="#equipo"]');
      if (equipoLink) {
        equipoLink.classList.add('active');
        equipoLink.setAttribute('aria-current', 'location');
      }
    } else {
      // Si estamos en la parte superior del hero
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });
      const inicioLink = document.querySelector('.main-nav a[href="index.html"]');
      if (inicioLink) {
        inicioLink.classList.add('active');
        inicioLink.setAttribute('aria-current', 'page');
      }
    }
  });
}

/* Acabado visual de portada: los observers no modifican el flip, el orden ni el foco. */
(() => {
  if (!document.body.classList.contains('home-page') || !('IntersectionObserver' in window)) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const core = document.querySelector('.digital-core');
  const cards = [...document.querySelectorAll('.member-card')];
  const arrivals = [...document.querySelectorAll('.hero-copy, .section-heading, .member-card, .essence-aside, .essence-content, .cta-inner')];
  let arrivalObserver, centerObserver, sceneObserver;
  let coreVisible = true;

  function pauseScene() {
    core.classList.toggle('scene-resting', document.hidden || !coreVisible);
  }

  function watchCenter() {
    if (centerObserver) centerObserver.disconnect();
    cards.forEach(card => card.classList.remove('is-scroll-lit'));
    if (reducedMotion.matches || !flipMode.matches) return;
    // Banda central de 24% del viewport; resalta la tarjeta sin girarla.
    const edge = Math.round(window.innerHeight * .38);
    centerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-scroll-lit', entry.isIntersecting));
    }, { rootMargin: `-${edge}px 0px -${edge}px 0px`, threshold: 0.01 });
    cards.forEach(card => centerObserver.observe(card));
  }

  function configureMotion() {
    if (arrivalObserver) arrivalObserver.disconnect();
    if (sceneObserver) sceneObserver.disconnect();
    arrivals.forEach(element => element.classList.remove('atmosphere-enter'));
    watchCenter();
    if (reducedMotion.matches) {
      core.classList.remove('scene-resting');
      return;
    }
    arrivalObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('atmosphere-enter');
        arrivalObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    arrivals.forEach(element => arrivalObserver.observe(element));
    sceneObserver = new IntersectionObserver(entries => {
      coreVisible = entries[0].isIntersecting;
      pauseScene();
    });
    sceneObserver.observe(core);
  }

  document.addEventListener('visibilitychange', pauseScene);
  reducedMotion.addEventListener('change', configureMotion);
  flipMode.addEventListener('change', watchCenter);
  window.addEventListener('resize', watchCenter);
  configureMotion();
})();
