# Sitio para una mueblería de melamina

Proyecto multipágina construido con HTML5, CSS3 y JavaScript Vanilla. No requiere framework, base de datos ni backend.

## Probar

El Preview administrado usa el puerto `3000`. Para probar una copia local desde la raíz del proyecto, sirve la carpeta con un servidor HTTP estático, por ejemplo:

```bash
python3 -m http.server 3000 --bind 0.0.0.0
```

Después abre `index.html` en el navegador. Las páginas y fotografías usan rutas relativas para que la copia descargada siga funcionando. En el Preview administrado, JavaScript prefiere las copias en almacenamiento `/manus-storage/` y mantiene las fotos locales como alternativa.

## Adaptación a dispositivos

Las 14 páginas incluyen `width=device-width`, escala inicial y `viewport-fit=cover`; no se bloquea el zoom del navegador. `css/responsive.css` adapta la navegación, columnas, formularios, catálogo, galería y footer desde pantallas compactas de 280–320 px hasta escritorio y monitores ultrapanorámicos, con reglas específicas para teléfonos pequeños, tabletas, orientación horizontal, áreas seguras/notch y controles táctiles. Las reglas fluidas de la hoja también cubren los anchos intermedios, sin depender de un dispositivo concreto.

## Completar antes de publicar

1. Edita `js/configuracion.js` con nombre legal/comercial, teléfono, WhatsApp internacional (solo dígitos), su etiqueta legible `whatsappDisplay`, email, dirección, RUC, horarios, código de sede, enlaces sociales y URL de Google Maps.
2. Sustituye testimonios y proyectos demostrativos por material real con autorización. Revisa nombres, descripciones, medidas y carta de colores del catálogo.
3. Completa cada campo entre corchetes en `legales/` y solicita revisión jurídica/empresarial. `docs/referencias-legales.md` registra las fuentes oficiales consultadas; no certifica cumplimiento.
4. No ofrezcas como oficial el formulario estático de `libro-reclamaciones.html`: solo genera una hoja local marcada como borrador. Para recibir reclamaciones se requiere un sistema real de recepción, copia, seguimiento, seguridad, conservación y respuesta.
5. Configura un dominio público real y actualiza SEO/canónicos/Open Graph de imagen cuando exista. No se inventa una URL pública en esta versión.

Los formularios de contacto y cotización preparan un enlace a WhatsApp y no envían datos a un servidor. Si no hay número configurado, comunican que el canal no está habilitado. La fotografía de cotización solo se previsualiza localmente y debe adjuntarse manualmente en WhatsApp.
