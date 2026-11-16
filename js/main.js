(function () {
  'use strict';

  const config = window.MUEBLERIA_CONFIG || {};
  const utils = window.MUEBLERIA_UTILS || {};
  const assets = window.MUEBLERIA_ASSET_PATHS || {};
  const base = document.body.dataset.base || '';
  const byId = (id) => document.getElementById(id);

  const phoneText = (value) => String(value || '').trim();
  const businessFields = {
    legalName: config.legalName || config.brandName,
    brandName: config.brandName,
    address: config.address,
    hours: config.hours,
    phoneDisplay: config.phone,
    whatsappDisplay: config.whatsappDisplay || config.whatsapp,
    email: config.email,
    ruc: config.ruc,
    storeCode: config.storeCode
  };

  document.querySelectorAll('[data-brand-name]').forEach((node) => {
    node.textContent = config.brandName || 'Muebles a medida';
  });
  if (config.logoPath) {
    document.querySelectorAll('[data-brand-logo]').forEach((node) => {
      const image = document.createElement('img');
      const isAbsolute = /^https:\/\//i.test(config.logoPath);
      image.src = isAbsolute ? config.logoPath : `${base}${config.logoPath.replace(/^\//, '')}`;
      image.alt = '';
      image.setAttribute('aria-hidden', 'true');
      node.replaceChildren(image);
    });
  }
  document.querySelectorAll('[data-business-field]').forEach((node) => {
    const value = phoneText(businessFields[node.dataset.businessField]);
    node.textContent = value || 'Completar antes de publicar';
  });
  const requestedService = new URLSearchParams(window.location.search).get('servicio');
  if (requestedService) {
    const topic = document.querySelector('#contact-form-element select[name="topic"]');
    const message = document.querySelector('#contact-form-element textarea[name="message"]');
    if (topic) topic.value = 'Servicio';
    if (message && !message.value) message.value = `Quisiera consultar por el servicio: ${requestedService}.`;
  }
  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
  const publicOrigin = utils.safeExternalUrl?.(config.publicOrigin);
  if (publicOrigin) {
    const origin = new URL(publicOrigin).origin;
    const pathname = window.location.pathname.endsWith('/index.html')
      ? window.location.pathname.slice(0, -'index.html'.length)
      : window.location.pathname;
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${origin}${pathname || '/'}`;
    document.head.appendChild(canonical);
    const setMeta = (attribute, key, value) => {
      let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = value;
    };
    const socialImage = `${origin}/assets/img/hero-cocina.webp`;
    setMeta('property', 'og:url', canonical.href);
    setMeta('property', 'og:image', socialImage);
    setMeta('property', 'og:image:alt', 'Mobiliario de cocina a medida, fotografía ilustrativa');
    setMeta('name', 'twitter:image', socialImage);
    if (config.brandName) setMeta('property', 'og:site_name', config.brandName);
  }

  const managedOrigin = /\.manus\.computer$/i.test(window.location.hostname);
  const applyStorageAssets = (scope = document) => {
    if (!managedOrigin) return;
    scope.querySelectorAll('[data-asset]').forEach((node) => {
      const storagePath = assets[node.dataset.asset];
      if (storagePath) {
        if (node.tagName === 'IMG') node.src = storagePath;
        if (node.hasAttribute('data-lightbox')) node.dataset.lightbox = storagePath;
      }
    });
  };
  window.MUEBLERIA_APPLY_ASSETS = applyStorageAssets;
  applyStorageAssets();

  const menuButton = document.querySelector('.nav-toggle');
  const nav = byId('primary-navigation');
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav?.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const defaultMessage = 'Hola, quisiera hacer una consulta sobre muebles de melamina a medida.';
  const quoteFallback = `${base}contacto.html#cotizacion`;
  document.querySelectorAll('[data-whatsapp-cta]').forEach((link) => {
    const url = utils.whatsappUrl?.(defaultMessage);
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.hidden = false;
      link.setAttribute('aria-label', link.classList.contains('floating-whatsapp')
        ? 'Abrir WhatsApp para solicitar una cotización'
        : 'Solicitar cotización por WhatsApp');
    } else {
      link.href = quoteFallback;
      link.removeAttribute('target');
      link.removeAttribute('rel');
      if (link.classList.contains('floating-whatsapp')) {
        link.hidden = true;
      } else {
        link.setAttribute('aria-label', 'Ir al formulario de cotización; WhatsApp pendiente de configurar');
      }
    }
  });
  document.querySelectorAll('[data-whatsapp-product]').forEach((link) => {
    const id = link.dataset.whatsappProduct;
    const product = (window.MUEBLERIA_PRODUCTS || []).find((item) => item.id === id);
    const message = product
      ? `Hola, quisiera consultar por: ${product.name}. ¿Podrían orientarme sobre medidas, materiales y cotización?`
      : defaultMessage;
    const url = utils.whatsappUrl?.(message);
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      if (link.classList.contains('product-wa-link')) link.textContent = 'Consultar por WhatsApp';
      link.setAttribute('aria-label', `Consultar ${product?.name || 'este mueble'} por WhatsApp`);
    } else {
      link.href = quoteFallback;
      link.removeAttribute('target');
      link.removeAttribute('rel');
      if (link.classList.contains('product-wa-link')) link.textContent = 'Solicitar cotización';
      link.setAttribute('aria-label', 'Ir al formulario de cotización; WhatsApp pendiente de configurar');
    }
  });

  document.querySelectorAll('[data-social]').forEach((link) => {
    const url = utils.safeExternalUrl?.(config.socials?.[link.dataset.social]);
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });

  const mapUrl = utils.safeExternalUrl?.(config.googleMapsUrl);
  const mapEmbedUrl = utils.safeExternalUrl?.(config.googleMapsEmbedUrl);
  const mapFrame = document.querySelector('[data-map-frame]');
  const mapPlaceholder = document.querySelector('[data-map-placeholder]');
  const mapAnchor = document.querySelector('[data-map-link]');
  if (mapUrl && mapAnchor && /(^|\.)google\.[a-z.]+\/maps|maps\.app\.goo\.gl/i.test(new URL(mapUrl).hostname + new URL(mapUrl).pathname)) {
    mapAnchor.href = mapUrl;
    mapAnchor.target = '_blank';
    mapAnchor.rel = 'noopener noreferrer';
    mapAnchor.hidden = false;
  } else if (mapAnchor) {
    mapAnchor.hidden = true;
  }
  if (mapEmbedUrl && mapFrame && new URL(mapEmbedUrl).hostname === 'www.google.com' && new URL(mapEmbedUrl).pathname.startsWith('/maps/embed')) {
    mapFrame.src = mapEmbedUrl;
    mapFrame.hidden = false;
    if (mapPlaceholder) mapPlaceholder.hidden = true;
  }

  document.querySelectorAll('[data-service-link]').forEach((link) => {
    const service = link.dataset.serviceLink;
    link.href = `${base}contacto.html?servicio=${encodeURIComponent(service)}#contact-form`;
  });

  const topButton = document.querySelector('.back-to-top');
  const syncScroll = () => {
    topButton?.classList.toggle('is-visible', window.scrollY > 520);
  };
  window.addEventListener('scroll', syncScroll, { passive: true });
  syncScroll();
  topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealNodes = document.querySelectorAll('[data-reveal]');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.body.classList.add('reveal-on-scroll');
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add('is-revealed'));
  }

  const filterButtons = Array.from(document.querySelectorAll('[data-gallery-filter]'));
  const galleryItems = Array.from(document.querySelectorAll('[data-gallery-category]'));
  const lightbox = byId('lightbox');
  const lightboxImage = byId('lightbox-image');
  const lightboxCaption = byId('lightbox-caption');
  const lightboxButtons = Array.from(document.querySelectorAll('[data-lightbox]'));
  let lightboxItems = [...lightboxButtons];
  let lightboxIndex = -1;
  const setGalleryFilter = (selected) => {
    galleryItems.forEach((item) => {
      item.hidden = selected !== 'all' && item.dataset.galleryCategory !== selected;
    });
    filterButtons.forEach((button) => {
      const active = button.dataset.galleryFilter.toLocaleLowerCase('es') === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    lightboxItems = lightboxButtons.filter((button) => !button.hidden);
  };
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    setGalleryFilter(button.dataset.galleryFilter.toLocaleLowerCase('es'));
  }));

  const showLightboxImage = (index) => {
    if (!lightboxItems.length || !lightboxImage || !lightboxCaption) return;
    lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
    const button = lightboxItems[lightboxIndex];
    const image = button.querySelector('img');
    lightboxImage.src = button.dataset.lightbox || image?.src || '';
    lightboxImage.alt = button.dataset.alt || image?.alt || 'Fotografía ampliada de mobiliario';
    lightboxCaption.textContent = image?.alt || 'Imagen referencial';
  };
  lightboxButtons.forEach((button) => button.addEventListener('click', () => {
    lightboxItems = lightboxButtons.filter((item) => !item.hidden);
    showLightboxImage(lightboxItems.indexOf(button));
    if (lightbox?.showModal) lightbox.showModal();
    else lightbox?.setAttribute('open', '');
  }));
  document.querySelector('[data-close-lightbox]')?.addEventListener('click', () => lightbox?.close());
  document.querySelector('.lightbox-prev')?.addEventListener('click', () => showLightboxImage(lightboxIndex - 1));
  document.querySelector('.lightbox-next')?.addEventListener('click', () => showLightboxImage(lightboxIndex + 1));
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1);
    if (event.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1);
  });
})();
