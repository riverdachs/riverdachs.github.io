// Global hamburger / waffle handler using event delegation
document.addEventListener('click', function (event) {
  const toggle = event.target.closest('.nav-toggle');
  if (!toggle) return; // click wasn't on the waffle

  const header = toggle.closest('header');
  if (!header) return;

  const nav = header.querySelector('nav');
  if (!nav) return;

  nav.classList.toggle('active');
});
