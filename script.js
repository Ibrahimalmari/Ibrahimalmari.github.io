const cleanCurrentUrl = () => {
  if (window.location.protocol === 'file:') return;

  const { pathname, search, hash } = window.location;
  if (!pathname.endsWith('.html') || pathname.endsWith('/404.html')) return;

  const cleanPath = pathname.endsWith('/index.html')
    ? pathname.slice(0, -'index.html'.length)
    : pathname.replace(/\.html$/, '/');

  window.history.replaceState(null, '', `${cleanPath}${search}${hash}`);
};
cleanCurrentUrl();

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('section[id]')];
const navItems = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
const activate = () => {
  const pos = window.scrollY + headerOffset + 180;
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.offsetTop <= pos) current = section.id;
  }
  navItems.forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', activate, { passive: true });
activate();
