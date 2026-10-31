'use strict';
// Core content, FAQ and purchase-contact links remain usable without JavaScript.
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
// Only HTTPS checkout URLs explicitly assigned to the corresponding product are used.
let configured = 0;
document.querySelectorAll('[data-checkout]').forEach(link => {
  const value = window.DOCLIV_CHECKOUTS?.[link.dataset.checkout];
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return;
    link.href = url.href;
    link.replaceChildren(document.createTextNode(link.dataset.purchaseLabel + ' '));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    link.append(arrow);
    configured += 1;
  } catch { /* Keep the working, product-specific contact link. */ }
});
const notice = document.querySelector('.purchase-note');
if (configured === document.querySelectorAll('[data-checkout]').length && notice) {
  notice.textContent = 'Escolha seu produto e confira as condições de pagamento no checkout.';
}
