(function () {
  'use strict';

  const config = window.MUEBLERIA_CONFIG || {};
  const utils = window.MUEBLERIA_UTILS || {};
  const makeWhatsAppUrl = utils.whatsappUrl || (() => '');
  const byId = (id) => document.getElementById(id);

  const statusMessage = (container, message, url, linkText) => {
    if (!container) return;
    container.replaceChildren();
    const text = document.createElement('p');
    text.textContent = message;
    container.appendChild(text);
    if (url) {
      const action = document.createElement('a');
      action.className = 'button button-outline status-action';
      action.href = url;
      action.target = '_blank';
      action.rel = 'noopener noreferrer';
      action.textContent = linkText || 'Abrir WhatsApp';
      container.appendChild(action);
    }
    container.classList.toggle('is-success', Boolean(url));
    container.classList.toggle('is-error', !url);
  };

  const quoteForm = byId('quote-form');
  if (quoteForm) {
    const status = byId('quote-status');
    const fileInput = byId('quote-reference');
    const fileName = byId('reference-name');
    const preview = byId('reference-preview');
    let imageUrl = '';

    fileInput?.addEventListener('change', () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      imageUrl = '';
      preview?.replaceChildren();
      if (preview) preview.hidden = true;
      const file = fileInput.files?.[0];
      if (!file) {
        if (fileName) fileName.textContent = 'Sin archivo seleccionado';
        return;
      }
      if (!file.type.startsWith('image/')) {
        fileInput.value = '';
        if (fileName) fileName.textContent = 'Elige un archivo de imagen.';
        statusMessage(status, 'El archivo seleccionado no es una imagen.', '', '');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        fileInput.value = '';
        if (fileName) fileName.textContent = 'La imagen supera el límite de 5 MB.';
        statusMessage(status, 'Selecciona una imagen de hasta 5 MB.', '', '');
        return;
      }
      imageUrl = URL.createObjectURL(file);
      if (fileName) fileName.textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB`;
      if (preview) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Vista previa de la imagen de referencia elegida';
        preview.appendChild(image);
        preview.hidden = false;
      }
      status?.replaceChildren();
    });

    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!quoteForm.reportValidity()) return;
      const form = new FormData(quoteForm);
      const message = [
        'Hola, quisiera solicitar una cotización de muebles.',
        `Nombre: ${form.get('name')}`,
        `Celular: ${form.get('phone')}`,
        form.get('email') ? `Correo: ${form.get('email')}` : '',
        `Tipo de mueble: ${form.get('furniture')}`,
        `Medidas aproximadas: ${form.get('measures')}`,
        `Color de melamina: ${form.get('color')}`,
        `Descripción: ${form.get('description')}`,
        fileInput?.files?.length ? 'Tengo una imagen de referencia seleccionada; la adjuntaré manualmente en WhatsApp.' : ''
      ].filter(Boolean).join('\n');
      const url = makeWhatsAppUrl(message);
      if (!url) {
        statusMessage(status, 'La consulta no se envió. El negocio debe completar su número de WhatsApp en js/configuracion.js antes de habilitar este canal.', '', '');
        return;
      }
      statusMessage(status, 'La consulta está lista. Al abrir WhatsApp revisarás el mensaje antes de enviarlo; la foto, si elegiste una, debes adjuntarla manualmente.', url, 'Revisar y abrir WhatsApp');
    });

    window.addEventListener('beforeunload', () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    });
  }

  const contactForm = byId('contact-form-element');
  if (contactForm) {
    const status = byId('contact-status');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const form = new FormData(contactForm);
      const message = [
        'Hola, quisiera realizar una consulta.',
        `Nombre: ${form.get('name')}`,
        `Correo: ${form.get('email')}`,
        form.get('phone') ? `Celular: ${form.get('phone')}` : '',
        `Motivo: ${form.get('topic')}`,
        `Mensaje: ${form.get('message')}`
      ].filter(Boolean).join('\n');
      const url = makeWhatsAppUrl(message);
      if (!url) {
        statusMessage(status, 'La consulta no se envió. El propietario debe configurar el número de WhatsApp del negocio antes de activar el envío.', '', '');
        return;
      }
      statusMessage(status, 'La consulta está lista para abrirse en WhatsApp. Revísala allí y envíala si estás de acuerdo.', url, 'Revisar y abrir WhatsApp');
    });
  }

  const claimForm = byId('reclamo-form');
  if (claimForm) {
    const dateField = claimForm.elements.namedItem('claimDate');
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    if (dateField && !dateField.value) dateField.value = localToday;
    if (dateField) dateField.max = localToday;

    const minorToggle = byId('consumer-minor');
    const guardianField = byId('guardian-field');
    const guardianInput = guardianField?.querySelector('input');
    minorToggle?.addEventListener('change', () => {
      if (guardianField) guardianField.hidden = !minorToggle.checked;
      if (guardianInput) guardianInput.required = minorToggle.checked;
      if (!minorToggle.checked && guardianInput) guardianInput.value = '';
    });

    const status = byId('reclamo-status');
    const documentSection = byId('claim-document');

    const appendRow = (parent, label, value) => {
      const row = document.createElement('div');
      row.className = 'claim-print-row';
      const heading = document.createElement('strong');
      heading.textContent = label;
      const copy = document.createElement('p');
      copy.textContent = value || 'No consignado';
      row.append(heading, copy);
      parent.appendChild(row);
    };

    const formatDate = (value) => {
      if (!value) return 'No consignada';
      const parsed = new Date(`${value}T12:00:00`);
      return new Intl.DateTimeFormat('es-PE', { dateStyle: 'long' }).format(parsed);
    };

    claimForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!claimForm.reportValidity()) return;
      const data = new FormData(claimForm);
      if (documentSection) {
        documentSection.replaceChildren();
        const heading = document.createElement('header');
        heading.className = 'claim-print-header';
        const mark = document.createElement('span');
        mark.className = 'claim-draft-stamp';
        mark.textContent = 'BORRADOR LOCAL · NO PRESENTADO';
        const title = document.createElement('h2');
        title.textContent = 'Hoja de reclamación · copia de demostración';
        const warning = document.createElement('p');
        warning.className = 'claim-print-warning';
        warning.textContent = 'Sin número oficial. Esta hoja se generó en el navegador y no fue enviada, recibida ni registrada por el proveedor.';
        heading.append(mark, title, warning);
        documentSection.appendChild(heading);

        const provider = document.createElement('section');
        provider.className = 'claim-print-section';
        provider.appendChild(Object.assign(document.createElement('h3'), { textContent: 'Proveedor' }));
        appendRow(provider, 'Razón social / nombre comercial', config.legalName || config.brandName || 'Pendiente de completar por el proveedor');
        appendRow(provider, 'RUC', config.ruc || 'Pendiente de completar por el proveedor');
        appendRow(provider, 'Dirección / código del establecimiento', [config.address, config.storeCode].filter(Boolean).join(' · ') || 'Pendiente de completar por el proveedor');
        appendRow(provider, 'Fecha', formatDate(data.get('claimDate')));
        documentSection.appendChild(provider);

        const consumer = document.createElement('section');
        consumer.className = 'claim-print-section';
        consumer.appendChild(Object.assign(document.createElement('h3'), { textContent: 'Consumidor reclamante' }));
        appendRow(consumer, 'Nombres y apellidos', data.get('consumerName'));
        appendRow(consumer, 'DNI / CE / documento', data.get('documentId'));
        appendRow(consumer, 'Domicilio', data.get('address'));
        appendRow(consumer, 'Teléfono', data.get('phone'));
        appendRow(consumer, 'Correo electrónico', data.get('email'));
        if (data.get('isMinor') === 'on') appendRow(consumer, 'Padre, madre o representante', data.get('guardian'));
        documentSection.appendChild(consumer);

        const matter = document.createElement('section');
        matter.className = 'claim-print-section';
        matter.appendChild(Object.assign(document.createElement('h3'), { textContent: 'Bien, servicio y pedido' }));
        appendRow(matter, 'Tipo', data.get('requestType'));
        appendRow(matter, 'Bien o servicio', data.get('item'));
        appendRow(matter, 'Monto reclamado', data.get('amount') ? `S/ ${data.get('amount')}` : 'No indicado');
        appendRow(matter, 'Descripción del bien o servicio', data.get('itemDescription'));
        appendRow(matter, 'Detalle de los hechos', data.get('facts'));
        appendRow(matter, 'Pedido concreto', data.get('request'));
        documentSection.appendChild(matter);

        const response = document.createElement('section');
        response.className = 'claim-print-section provider-response';
        response.appendChild(Object.assign(document.createElement('h3'), { textContent: 'Uso del proveedor · sin completar en esta demostración' }));
        appendRow(response, 'Observaciones y acciones adoptadas', 'Pendiente; esta hoja no se recibió oficialmente.');
        appendRow(response, 'Fecha de comunicación de respuesta', 'No disponible.');
        documentSection.appendChild(response);

        const footer = document.createElement('p');
        footer.className = 'claim-print-footer';
        footer.textContent = 'Documento generado localmente para revisión. No constituye constancia de presentación, número de expediente, respuesta ni registro ante el proveedor o Indecopi.';
        documentSection.appendChild(footer);
        documentSection.hidden = false;
        documentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      status?.replaceChildren();
      const note = document.createElement('p');
      note.textContent = 'Borrador local preparado. No se transmitió ni registró ningún dato. Puedes imprimir esta hoja o guardarla como PDF desde el diálogo de impresión.';
      const printButton = document.createElement('button');
      printButton.type = 'button';
      printButton.className = 'button button-dark status-action';
      printButton.textContent = 'Imprimir o guardar como PDF';
      printButton.addEventListener('click', () => window.print());
      status?.append(note, printButton);
      status?.classList.add('is-success');
      status?.classList.remove('is-error');
    });
  }
})();