/*
 * Configuración del negocio. Completar con datos reales antes de publicar.
 * whatsapp debe incluir código de país y solo dígitos, por ejemplo 51999999999.
 * No se almacena información ingresada por clientes en esta configuración.
 */
(function () {
  'use strict';

  window.MUEBLERIA_CONFIG = Object.freeze({
    brandName: '',
    logoPath: 'assets/logo/monograma.svg',
    tagline: 'Muebles de melamina a medida',
    whatsapp: '',
    whatsappDisplay: '',
    phone: '',
    email: '',
    address: '',
    ruc: '',
    legalName: '',
    hours: '',
    storeCode: '',
    publicOrigin: '',
    socials: Object.freeze({
      facebook: '',
      instagram: '',
      tiktok: ''
    }),
    googleMapsUrl: '',
    googleMapsEmbedUrl: ''
  });

  window.MUEBLERIA_ASSET_PATHS = Object.freeze({
    'armario-claro.webp': '/manus-storage/armario-claro_9866da0e.webp',
    'armario-dormitorio.webp': '/manus-storage/armario-dormitorio_ffab74db.webp',
    'biblioteca-clara.webp': '/manus-storage/biblioteca-clara_3ff3eaa4.webp',
    'biblioteca-sala.webp': '/manus-storage/biblioteca-sala_3ce1b858.webp',
    'centro-tv.webp': '/manus-storage/centro-tv_7e438bdc.webp',
    'closet-dormitorio.webp': '/manus-storage/closet-dormitorio_f12350c7.webp',
    'closet-lineal.webp': '/manus-storage/closet-lineal_1f328b48.webp',
    'closet-liso.webp': '/manus-storage/closet-liso_0c39bf5d.webp',
    'closet-moderno.webp': '/manus-storage/closet-moderno_929a3197.webp',
    'closet-nogal.webp': '/manus-storage/closet-nogal_66e42d44.webp',
    'cocina-blanca.webp': '/manus-storage/cocina-blanca_124be59c.webp',
    'cocina-clara.webp': '/manus-storage/cocina-clara_f76a207c.webp',
    'cocina-isla-verde.webp': '/manus-storage/cocina-isla-verde_99d1f282.webp',
    'cocina-isla.webp': '/manus-storage/cocina-isla_fdc350ef.webp',
    'cocina-oscura.webp': '/manus-storage/cocina-oscura_923ee36b.webp',
    'comoda-living.webp': '/manus-storage/comoda-living_3b9ded9e.webp',
    'comoda.webp': '/manus-storage/comoda_50c5d3ef.webp',
    'dormitorio.webp': '/manus-storage/dormitorio_818c611f.webp',
    'escritorio-luz-natural.webp': '/manus-storage/escritorio-luz-natural_bd0902c8.webp',
    'escritorio-minimal.webp': '/manus-storage/escritorio-minimal_a6988475.webp',
    'estanteria-sala.webp': '/manus-storage/estanteria-sala_cc96196e.webp',
    'hero-cocina.webp': '/manus-storage/hero-cocina_ac515e82.webp',
    'librero-interior.webp': '/manus-storage/librero-interior_4336f5dd.webp',
    'oficina-calida.webp': '/manus-storage/oficina-calida_15d6440c.webp',
    'oficina-clara.webp': '/manus-storage/oficina-clara_6e55d97f.webp',
    'oficina-estanteria.webp': '/manus-storage/oficina-estanteria_b1c9871a.webp',
    'oficina-madera.webp': '/manus-storage/oficina-madera_b7444b53.webp',
    'oficina-tv.webp': '/manus-storage/oficina-tv_4696433a.webp',
    'taller-demostracion.webp': '/manus-storage/taller-demostracion_0a1280d8.webp',
    'velador.webp': '/manus-storage/velador_cfa800b0.webp',
    'vestidor-calido.webp': '/manus-storage/vestidor-calido_34bbdcc7.webp',
    'walk-in-closet.webp': '/manus-storage/walk-in-closet_a7977cab.webp',
  });

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  const whatsappUrl = (message) => {
    const number = String(window.MUEBLERIA_CONFIG.whatsapp || '').replace(/\D/g, '');
    if (number.length < 8) return '';
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  const safeExternalUrl = (value) => {
    try {
      const url = new URL(String(value || ''));
      return url.protocol === 'https:' ? url.href : '';
    } catch (_error) {
      return '';
    }
  };

  window.MUEBLERIA_UTILS = Object.freeze({ escapeHtml, whatsappUrl, safeExternalUrl });
})();
