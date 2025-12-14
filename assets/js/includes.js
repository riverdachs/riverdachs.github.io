document.addEventListener('DOMContentLoaded', () => {
  // Detect if we're in a subdirectory
  const pathPrefix = window.location.pathname.includes('/docs/') || 
                     window.location.pathname.includes('/forms/') 
                     ? '../' : '';

  // HEADER
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch(pathPrefix + 'includes/header.html')
      .then(response => response.text())
      .then(html => {
        headerPlaceholder.innerHTML = html;
      })
      .catch(err => console.error('Error loading header:', err));
  }

  // FOOTER
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch(pathPrefix + 'includes/footer.html')
      .then(response => response.text())
      .then(html => {
        footerPlaceholder.innerHTML = html;

        // Set year after footer is injected
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      })
      .catch(err => console.error('Error loading footer:', err));
  }
});
