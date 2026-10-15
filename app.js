(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation');
    }));
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const productGrid = document.querySelector('#product-grid');
  if (productGrid) {
    fetch('products.json')
      .then(response => {
        if (!response.ok) throw new Error('Catalog unavailable');
        return response.json();
      })
      .then(products => {
        if (!Array.isArray(products) || products.length === 0) return;
        productGrid.innerHTML = products.map(product => {
          const name = escapeHTML(product.name || 'Audio equipment');
          const category = escapeHTML(product.category || 'Audio equipment');
          const description = escapeHTML(product.description || 'Contact us for details and availability.');
          const price = product.price ? '<div class="product-price">' + escapeHTML(product.price) + '</div>' : '';
          const image = product.image_url
            ? '<img src="' + escapeHTML(product.image_url) + '" alt="' + name + '" loading="lazy">'
            : '<span class="product-placeholder">BZ / AUDIO</span>';
          const subject = encodeURIComponent('BZaudio product inquiry — ' + (product.name || 'Audio equipment'));
          const body = encodeURIComponent('Hello BZaudio,\n\nI would like to ask about: ' + (product.name || 'Audio equipment') + '\n\nPlease share current pricing and availability.');
          const action = product.product_url
            ? '<a href="' + escapeHTML(product.product_url) + '" target="_blank" rel="noopener noreferrer">View product <span>↗</span></a>'
            : '<a href="mailto:benrz101@gmail.com?subject=' + subject + '&body=' + body + '">Ask about this item <span>↗</span></a>';
          return '<article class="product-card"><div class="product-image">' + image + '</div><div class="product-copy"><span class="product-category">' + category + '</span><h3 class="product-name">' + name + '</h3><p class="product-description">' + description + '</p>' + price + '<div class="product-action">' + action + '</div></div></article>';
        }).join('');
      })
      .catch(() => {
        productGrid.innerHTML = '<p class="catalog-empty">The catalog could not load right now. Please contact us for equipment options.</p>';
      });
  }

  const form = document.querySelector('#contact-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('BZaudio inquiry — ' + data.get('interest'));
    const body = encodeURIComponent(
      'Name: ' + data.get('name') + '\n' +
      'Email: ' + data.get('email') + '\n' +
      'Church / organization: ' + (data.get('organization') || 'Not provided') + '\n' +
      'Interest: ' + data.get('interest') + '\n\n' +
      'Project details:\n' + data.get('message')
    );
    const status = document.querySelector('#form-status');
    if (status) status.textContent = 'Opening your email app with the inquiry addressed to benrz101@gmail.com. Review it and press Send in your email app. This website does not send or store the inquiry.';
    window.location.href = 'mailto:benrz101@gmail.com?subject=' + subject + '&body=' + body;
  });
})();
