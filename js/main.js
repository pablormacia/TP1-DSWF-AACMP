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

const shuffleButton = document.querySelector('#shuffle-team');
const teamGrid = document.querySelector('#team-grid');
if (shuffleButton && teamGrid) {
  shuffleButton.addEventListener('click', () => {
    const cards = [...teamGrid.children];
    cards.sort(() => Math.random() - 0.5).forEach(card => teamGrid.appendChild(card));
    shuffleButton.firstChild.textContent = '¡Nuevo orden! ';
  });
}
