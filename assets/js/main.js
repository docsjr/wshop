'use strict';
// O conteúdo, os checkouts e as perguntas frequentes funcionam sem JavaScript.
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
const mobile = window.matchMedia('(max-width: 850px)');
function closeMenu(restoreFocus = false) {
  const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
  if (restoreFocus && wasOpen) toggle.focus();
}
if (toggle && menu) {
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  mobile.addEventListener('change', () => closeMenu());
}

// A prévia e a escolha de versão usam controles nativos de teclado.
// Sem JavaScript, todos os exemplos e as duas explicações continuam visíveis.
for (const switcher of document.querySelectorAll('.switcher')) {
  const controls = switcher.querySelector('[data-switcher-controls]');
  const panels = switcher.querySelectorAll('[data-switcher-panel]');
  function showSelectedPanel() {
    const selected = controls.querySelector('input:checked');
    for (const panel of panels) panel.hidden = panel.id !== selected.value;
  }
  controls.addEventListener('change', showSelectedPanel);
  showSelectedPanel();
  controls.hidden = false;
}
