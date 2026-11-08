/* Progressive enhancement: every article and FAQ is readable without JavaScript. */
const menu = document.querySelector('#mobile-menu');
const trigger = document.querySelector('.menu-toggle');
const close = document.querySelector('.menu-close');
if (menu && trigger && close && typeof menu.showModal === 'function') {
  document.body.classList.add('enhanced');
  trigger.hidden = false;
  trigger.addEventListener('click', () => {
    menu.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    close.focus();
  });
  close.addEventListener('click', () => menu.close());
  menu.addEventListener('close', () => {
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    trigger.focus();
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.close()));
  // Native dialog provides focus containment, inert background and Escape handling.
  const header = document.querySelector('.header-inner');
  const reflow = () => {
    document.body.classList.remove('compact-header');
    if (header.scrollWidth > header.clientWidth + 1) document.body.classList.add('compact-header');
  };
  window.addEventListener('resize', reflow);
  document.fonts?.ready.then(reflow);
  reflow();
}
document.querySelectorAll('.faq-toggle').forEach(button => {
  const answer = document.getElementById(button.getAttribute('aria-controls'));
  if (!answer) return;
  button.disabled = false;
  answer.hidden = true;
  button.setAttribute('aria-expanded', 'false');
  button.querySelector('span').textContent = '+';
  button.addEventListener('click', () => {
    answer.hidden = !answer.hidden;
    button.setAttribute('aria-expanded', String(!answer.hidden));
    button.querySelector('span').textContent = answer.hidden ? '+' : '−';
  });
});
document.querySelectorAll('.demonstration').forEach(demo => {
  const controls = demo.querySelector('.topic-controls');
  const buttons = [...controls.querySelectorAll('button')];
  const articles = [...demo.querySelectorAll('.sample')];
  const select = selected => {
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === selected)));
    articles.forEach((article, i) => { article.hidden = i !== selected; });
  };
  buttons.forEach((button, i) => button.addEventListener('click', () => select(i)));
  select(0);
  controls.hidden = false;
});
// Preserve meaningful old landing-page anchors without replacing whole pages.
const legacy = {inicio:'',metodo:'metodo-regular/',materiais:'metodo-regular/',planos:'metodo-regular/#versoes-e-precos',pratica:'metodo-regular/#atividade',cuidado:'consultoria/',medico:'sobre/',extras:'metodo-regular/#guias'};
const home = document.querySelector('.brand').getAttribute('href');
if (location.pathname === home || location.pathname === `${home}index.html`) {
  const target = legacy[location.hash.slice(1)];
  if (target) location.replace(home + target);
}
