(function () {
  'use strict';

  const products = window.MUEBLERIA_PRODUCTS || [];
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const search = document.getElementById('product-search');
  const category = document.getElementById('category-filter');
  const sort = document.getElementById('product-sort');
  const results = document.getElementById('catalog-results');
  const empty = document.getElementById('catalog-empty');
  const clear = document.getElementById('clear-catalog');
  const dialog = document.getElementById('product-modal');
  const dialogContent = document.getElementById('product-modal-content');
  const base = document.body.dataset.base || '';
  const productMap = new Map(products.map((product) => [product.id, product]));
  let lastTrigger = null;

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const addFact = (container, label, value) => {
    const row = element('span', '', '');
    row.append(element('b', '', label), document.createTextNode(value));
    container.appendChild(row);
  };

  const createProductCard = (product, index) => {
    const card = element('article', 'product-card');
    card.dataset.productCard = '';
    card.dataset.id = product.id;
    card.dataset.category = product.category;
    card.dataset.name = product.name.toLocaleLowerCase('es');
    card.dataset.search = `${product.name} ${product.description} ${product.categoryLabel}`.toLocaleLowerCase('es');
    card.dataset.order = String(index);

    const photoLink = element('a', 'product-photo');
    photoLink.href = `${base}contacto.html#cotizacion`;
    photoLink.dataset.productDetails = product.id;
    photoLink.setAttribute('aria-label', `Ver detalles de ${product.name}`);
    const image = document.createElement('img');
    image.src = `${base}assets/img/${product.image}`;
    image.dataset.asset = product.image;
    image.alt = product.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    photoLink.append(image, element('span', 'image-badge', 'Imagen referencial'));

    const body = element('div', 'product-card-body');
    const meta = element('div', 'product-meta');
    meta.append(element('span', '', product.categoryLabel), element('span', '', 'A medida'));
    body.append(meta, element('h2', '', product.name), element('p', '', product.description));
    const facts = element('div', 'product-facts');
    addFact(facts, 'Medidas', product.dimensions);
    addFact(facts, 'Colores', product.colors);
    body.appendChild(facts);

    const bottom = element('div', 'product-card-bottom');
    bottom.appendChild(element('span', 'price-label', product.price));
    const details = element('a', 'text-link', 'Ver detalles ↗');
    details.href = `${base}contacto.html#cotizacion`;
    details.dataset.productDetails = product.id;
    bottom.appendChild(details);
    body.appendChild(bottom);

    const whatsapp = element('a', 'product-wa-link', 'Solicitar cotización');
    whatsapp.href = `${base}contacto.html#cotizacion`;
    whatsapp.dataset.whatsappProduct = product.id;
    whatsapp.setAttribute('aria-label', 'Ir al formulario de cotización; WhatsApp pendiente de configurar');
    body.appendChild(whatsapp);
    card.append(photoLink, body);
    return card;
  };

  const cards = products.map(createProductCard);
  grid.replaceChildren(...cards);

  const applyFilters = () => {
    const term = (search?.value || '').trim().toLocaleLowerCase('es');
    const selectedCategory = category?.value || 'all';
    const ordered = [...cards].sort((a, b) => {
      const left = a.dataset.name || '';
      const right = b.dataset.name || '';
      if (sort?.value === 'za') return right.localeCompare(left, 'es');
      if (sort?.value === 'az') return left.localeCompare(right, 'es');
      return Number(a.dataset.order) - Number(b.dataset.order);
    });
    let visibleCount = 0;
    ordered.forEach((card) => {
      const matchesCategory = selectedCategory === 'all' || card.dataset.category === selectedCategory;
      const matchesSearch = !term || card.dataset.search.includes(term);
      card.hidden = !(matchesCategory && matchesSearch);
      if (!card.hidden) visibleCount += 1;
      grid.appendChild(card);
    });
    if (results) results.textContent = `${visibleCount} ${visibleCount === 1 ? 'idea encontrada' : 'ideas encontradas'}`;
    if (empty) empty.hidden = visibleCount !== 0;
  };

  const appendModalFact = (container, label, value) => {
    const row = element('div', 'modal-fact');
    row.append(element('strong', '', label), element('span', '', value));
    container.appendChild(row);
  };

  const openDetails = (productId, trigger) => {
    const product = productMap.get(productId);
    if (!product || !dialog || !dialogContent) return;
    lastTrigger = trigger;
    dialogContent.replaceChildren();

    const layout = element('div', 'product-modal-layout');
    const figure = element('figure', 'product-modal-image');
    const image = document.createElement('img');
    image.src = `${base}assets/img/${product.image}`;
    image.dataset.asset = product.image;
    image.alt = product.alt;
    image.loading = 'eager';
    image.decoding = 'async';
    figure.appendChild(image);

    const copy = element('div', 'product-modal-copy');
    copy.append(element('p', 'eyebrow', product.categoryLabel));
    const title = element('h2', '', product.name);
    title.id = 'modal-title';
    copy.append(title, element('p', '', product.description));
    const facts = element('div', 'modal-facts');
    appendModalFact(facts, 'Medidas referenciales', product.dimensions);
    appendModalFact(facts, 'Colores orientativos', product.colors);
    appendModalFact(facts, 'Materiales y acabados', product.materials);
    appendModalFact(facts, 'Precio', product.price);
    copy.appendChild(facts);
    copy.appendChild(element('p', 'micro-note', 'Imágenes y especificaciones de demostración. Confirma la propuesta con el negocio antes de comprar.'));

    const actions = element('div', 'modal-actions');
    const whatsapp = element('a', 'button button-dark', 'Solicitar cotización');
    whatsapp.href = `${base}contacto.html#cotizacion`;
    whatsapp.dataset.whatsappProduct = product.id;
    const waUrl = window.MUEBLERIA_UTILS?.whatsappUrl?.(`Hola, quisiera consultar por: ${product.name}. ¿Podrían orientarme sobre medidas, materiales y cotización?`);
    if (waUrl) {
      whatsapp.textContent = 'Consultar por WhatsApp';
      whatsapp.href = waUrl;
      whatsapp.target = '_blank';
      whatsapp.rel = 'noopener noreferrer';
      whatsapp.setAttribute('aria-label', `Consultar ${product.name} por WhatsApp`);
    } else {
      whatsapp.setAttribute('aria-label', 'Ir al formulario de cotización; WhatsApp pendiente de configurar');
    }
    const quote = element('a', 'text-link', 'Solicitar una cotización ↗');
    quote.href = `${base}contacto.html#cotizacion`;
    actions.append(whatsapp, quote);
    copy.appendChild(actions);
    layout.append(figure, copy);
    dialogContent.appendChild(layout);
    if (typeof window.MUEBLERIA_APPLY_ASSETS === 'function') window.MUEBLERIA_APPLY_ASSETS(dialogContent);
    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute('open', '');
    dialog.querySelector('[data-close-dialog]')?.focus();
  };

  search?.addEventListener('input', applyFilters);
  category?.addEventListener('change', applyFilters);
  sort?.addEventListener('change', applyFilters);
  clear?.addEventListener('click', () => {
    if (search) search.value = '';
    if (category) category.value = 'all';
    if (sort) sort.value = 'featured';
    applyFilters();
    search?.focus();
  });

  if (category) {
    const requestedCategory = new URLSearchParams(window.location.search).get('categoria');
    if (requestedCategory && Array.from(category.options).some((option) => option.value === requestedCategory)) {
      category.value = requestedCategory;
    }
  }

  grid.addEventListener('click', (event) => {
    const link = event.target.closest('[data-product-details]');
    if (!link) return;
    event.preventDefault();
    openDetails(link.dataset.productDetails, link);
  });

  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => lastTrigger?.focus());
  applyFilters();
})();
