// Se ejecuta en el head para aplicar el tema antes de mostrar la página.
(() => {
  const key = 'aacmp-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  let button;

  try {
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch {
    // El sitio sigue funcionando si el navegador bloquea el almacenamiento.
  }

  // Intercambia el src de las imágenes temáticas según el tema activo.
  function applyThemeImages(theme) {
    document.querySelectorAll('img[data-src-light][data-src-dark]').forEach(img => {
      if (img.dataset.showingReal === 'true') return;
      img.src = theme === 'dark' ? img.dataset.srcDark : img.dataset.srcLight;
      if (img.dataset.srcsetLight && img.dataset.srcsetDark) {
        img.srcset = theme === 'dark' ? img.dataset.srcsetDark : img.dataset.srcsetLight;
      }
    });
  }

  function applyTheme() {
    const theme = preference || (system.matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    if (button) button.setAttribute('aria-pressed', String(theme === 'dark'));
    applyThemeImages(theme);
  }

  applyTheme();
  system.addEventListener('change', () => {
    if (!preference) applyTheme();
  });

  document.addEventListener('DOMContentLoaded', () => {
    button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.hidden = false;
    applyTheme();
    button.addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try {
        localStorage.setItem(key, preference);
      } catch {
        // La elección sigue vigente en esta página aunque no pueda persistirse.
      }
    });
  });
})();
