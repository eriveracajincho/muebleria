# Entregables del sitio Madera Luz

Estado a 15 de noviembre de 2026: prototipo estático de HTML5, CSS3 y JavaScript Vanilla con 14 páginas. No tiene backend. Los datos de contacto de la empresa no fueron proporcionados; WhatsApp, redes, mapa y enlaces relacionados solo se activan cuando el propietario los configura. El Libro se presenta expresamente como demostración local y no recibe ni registra reclamos oficiales. No se publica en un dominio público.

Los criterios reflejan la solicitud aprobada. Los estados “Parcial” identifican dependencias de datos, revisión legal o infraestructura que no pueden suplirse con información inventada.

## Parcial — Encabezado, navegación, portada y beneficios

- El encabezado incluye logotipo, nombre comercial, Inicio, Nosotros, Catálogo, Servicios, Proyectos realizados, Galería, Contacto y un botón destacado para cotizar por WhatsApp.
- La navegación enlaza a las páginas/secciones reales, permite desplazamiento suave y permanece visible al desplazarse cuando corresponde.
- En móvil existe un menú hamburguesa operable por teclado y táctil.
- Inicio contiene fotografía apropiada de muebles de melamina, título comercial, descripción, botones “Ver catálogo” y “Solicitar cotización”, y señales visuales de confianza/calidad.
- La sección de beneficios incluye diseños personalizados, materiales de calidad, acabados profesionales, atención personalizada y fabricación a medida.

Evidencia: encabezado y navegación multipágina responsive implementados. El CTA de cotización dirige al formulario mientras falta el WhatsApp real; el acceso flotante a WhatsApp permanece oculto hasta configurar el número para evitar un destino engañoso. El nombre es un marcador editable, no una marca atribuida al proveedor.

## Parcial — Página Nosotros

- Presenta quiénes somos, historia, misión, visión, valores, experiencia en fabricación y compromiso con clientes.
- Integra fotografías del taller y/o proceso; toda imagen no comprobada como trabajo real se identifica como demostración.
- No inventa antigüedad, certificaciones, local, trabajadores ni datos corporativos.

Evidencia: página y contenido de plantilla implementados con imagen de taller identificada como demostrativa. La empresa debe reemplazar las partes generales por su historia y experiencia reales antes de publicar.

## Completo en modo demostración — Catálogo dinámico y datos editables

- Los productos se mantienen en un archivo JavaScript modificable sin editar el HTML de la plantilla.
- El catálogo cubre roperos y closets, cocinas de melamina, escritorios, centros de entretenimiento, muebles para dormitorios, cómodas y veladores, muebles para oficinas, muebles para negocios y muebles personalizados.
- Cada producto ofrece fotografía, nombre, descripción, categoría, medidas referenciales, colores disponibles, precio referencial o “Solicitar cotización”, botón “Ver detalles” y botón “Consultar por WhatsApp”.
- Hay búsqueda, filtro por categoría, ordenamiento y modal de detalles para cada producto; los estados sin resultados y los controles tienen contenido visible y funcional.
- Los datos de medidas, color y precio se identifican como referenciales cuando no estén verificados por el negocio; no se presenta un precio definitivo inventado.

Evidencia: nueve categorías implementadas, datos centralizados en `js/productos.js`, render dinámico, búsqueda/filtros/orden/modal y fichas rotuladas como demostración. Hasta configurar el WhatsApp, las acciones de producto llevan al formulario con el texto “Solicitar cotización”. El propietario debe sustituir o verificar los productos y especificaciones antes de publicar.

## Completo en modo demostración — Servicios y proyectos

- Servicios mostrados con imagen, descripción y consulta: fabricación a medida, diseño personalizado, instalación, remodelación de cocinas, diseño de closets, asesoramiento en materiales/acabados y fabricación para oficinas/negocios.
- Proyectos incluyen nombre, tipo de mueble, descripción, fotografías y ubicación opcional.
- Cada proyecto no verificado se rotula claramente “Ejemplo de demostración”; no se atribuyen como trabajos reales ni se inventan ubicaciones.

Evidencia: siete servicios y tarjetas de proyectos de ejemplo; las fotografías son distintas entre secciones, referenciales y no se atribuyen a la empresa. Los enlaces de servicio conservan el tema de consulta al abrir el formulario. No se han proporcionado proyectos reales ni ubicaciones.

## Parcial — Cotización y contacto por WhatsApp

- Formulario de presupuesto incluye nombre completo, número de celular, correo opcional, tipo de mueble, medidas aproximadas, color de melamina, descripción y fotografía de referencia opcional.
- Los campos obligatorios se validan; las entradas se insertan de forma segura en el mensaje de WhatsApp, sin interpretar HTML ingresado por la persona.
- Si no hay un número WhatsApp configurado, la interfaz explica que el propietario debe configurarlo y no muestra un falso éxito ni un enlace inválido.
- El contacto presenta campos configurables para dirección, teléfono, WhatsApp, email, horarios, Facebook, Instagram, TikTok y mapa Google; no inventa datos ni muestra enlaces vacíos.
- El formulario de contacto valida datos y abre WhatsApp con el contenido de consulta; no afirma que envía email ni guarda información.

Evidencia: validación y preparación local del mensaje implementadas; no existe envío a un servidor ni almacenamiento. El teléfono WhatsApp, email, dirección, redes y ubicación reales no fueron entregados. Hasta que se configuren, WhatsApp, el mapa y redes permanecen desactivados/ocultos; la consulta ofrece el formulario local como alternativa. La foto de referencia solo se previsualiza y debe adjuntarse manualmente en WhatsApp.

## Completo en modo demostración — Galería, opiniones y preguntas frecuentes

- Galería cubre cocinas, dormitorios, closets, escritorios, oficinas y muebles personalizados, con fotos distintas y lightbox ampliable, accesible y cerrable.
- Las imágenes con fines ilustrativos quedan identificadas como ejemplos y usan texto alternativo significativo y carga diferida.
- La sección de opiniones no inventa testimonios reales: cada texto ficticio o demostrativo se identifica como demostración hasta recibir opiniones verificadas; alternativamente se explica que faltan opiniones verificadas.
- FAQ implementa acordeones para: fabricación a medida; tipos de melamina utilizados; plazo de fabricación; instalaciones; cómo solicitar cotización; formas de pago; y entregas a domicilio. Las respuestas comerciales pendientes de confirmar se marcan para revisión del propietario, no se inventan.

Evidencia: filtros, controles accesibles, lightbox nombrado y FAQ nativa implementados. No se presentan opiniones reales sin verificar; los contenidos de demostración y respuestas comerciales deben revisarse antes de publicar.

## Parcial — Libro de Reclamaciones

- Página independiente con identificación del proveedor, razón social/nombre comercial, RUC, dirección del establecimiento y código/numeración configurables; incluye fecha, datos del consumidor (nombres y apellidos, DNI/documento, domicilio, teléfono y correo; padre/madre o representante para menores, cuando aplique), opción Reclamo o Queja, identificación del producto o servicio, monto reclamado cuando aplique, descripción, detalle de hechos, pedido concreto, aceptación/aviso de tratamiento de datos cuando corresponda y espacios para observaciones/acciones del proveedor y fecha de comunicación de respuesta.
- Valida campos y muestra errores/confirmación comprensibles; ofrece constancia imprimible o descargable únicamente como borrador local.
- Informa antes y después de rellenar que no hay backend: los datos no se remiten ni registran oficialmente y la constancia no acredita presentación al proveedor. Los datos no se guardan permanentemente por el sitio.
- Mantiene la preparación para futura integración backend sin simular recepción, atención o plazo de respuesta oficial.
- El propietario debe revisar identidad/RUC/dirección, texto legal, aviso de datos, configuración de almacenamiento y atención, así como el cumplimiento vigente antes de ofrecer el formulario como Libro oficial.

Evidencia: formulario validado y hoja imprimible local marcada “BORRADOR”; solicita usar datos ficticios en esta demostración. Sin backend, folio/copia de recepción, almacenamiento ni seguimiento, no es un Libro operativo ni una reclamación presentada. Requiere revisión legal/operativa y una integración real antes de promocionarlo como oficial.

## Parcial — Páginas legales

- Existen páginas independientes de privacidad, protección de datos personales, términos y condiciones, cambios/devoluciones, garantías y entregas/envíos.
- Los textos están contextualizados como borradores para una mueblería peruana, con marcadores visibles para los datos empresariales y las condiciones que debe completar el propietario.
- No se inventan plazos, cobertura de garantía, costos de envío, condiciones de devolución, medios de pago ni prácticas de datos empresariales.
- Se distinguen borradores orientativos de asesoramiento y de cumplimiento legal certificado; se enlazan fuentes oficiales consultadas y se pide revisión antes de publicar.

Evidencia: las seis páginas están preparadas con marcadores de información pendiente y referencias oficiales en `docs/referencias-legales.md`. No constituyen asesoría jurídica ni políticas comerciales finales; el propietario debe completarlas y hacerlas revisar.

## Parcial — Footer y datos de configuración

- Footer profesional de cuatro columnas: Empresa (marca, resumen, redes); Navegación (Inicio, Nosotros, Catálogo, Servicios, Proyectos, Contacto); Atención (FAQ, cotización, privacidad, términos, cambios/devoluciones/garantías); Información legal (Libro de Reclamaciones, tratamiento de datos, contacto y derechos).
- La franja inferior muestra copyright, año actualizado automáticamente por JavaScript, nombre comercial configurable y enlaces legales.
- Configuración JS permite cambiar nombre, logotipo, WhatsApp, teléfono, email, dirección, RUC, horarios, redes y mapa sin buscar esos datos por todo el HTML.
- Ninguna información empresarial real se inventa; los campos vacíos quedan claramente señalados para completar antes de publicar.

Evidencia: estructura, etiquetas Empresa y componentes de cuatro columnas implementados; datos editables en `js/configuracion.js`, marcas y campos vacíos. Dirección, razón social/nombre, RUC, horarios, contacto, redes, URL de mapa y dominio reales siguen pendientes del propietario.

## Parcial — Diseño, funciones transversales y SEO

- Diseño minimalista, moderno, elegante y profesional usando la paleta marrón madera `#6B4226`, beige `#D9B98C`, crema `#F5F1E9`, blanco `#FFFFFF` y negro `#292929`; tipografía legible, transiciones suaves y efectos hover coherentes.
- Adaptable desde pantallas compactas de 280–320 px CSS hasta móviles, tabletas, escritorio y monitores ultrapanorámicos. Todas las páginas tienen meta viewport, incluyen escala normal del navegador y `viewport-fit=cover`; las reglas responsive consideran tamaños intermedios, orientación horizontal, áreas seguras/notch y pantallas táctiles con controles de tamaño amigable. Incluye botón flotante de WhatsApp cuando el número real está configurado, botón para regresar arriba, animación de desplazamiento que respeta movimiento reducido y navegación accesible.
- Formularios e interfaces incorporan validación, mensajes de error/éxito honestos y mitigación básica de inyección HTML.
- SEO incluye contenido semántico real presente en cada HTML, títulos y descripciones por página, Open Graph, textos alternativos, enlaces internos, URLs públicas consistentes y sitemap/robots solo con origen real configurado. No se adivinan URLs canónicas.
- Imágenes apropiadas, distintas, optimizadas, con `loading="lazy"` cuando corresponda y sin fotografías repetidas para aparentar proyectos reales.
- Los enlaces no son `#` vacíos; cada CTA o completa la acción, o se identifica claramente como no configurado.

Evidencia: las 14 páginas incluyen viewport; `responsive.css` cubre puntos de quiebre a 1180, 900, 640, 380 y 320 px, orientación horizontal en pantallas bajas, áreas seguras, puntero táctil y monitores de 1600 px o más. Capturas de portada, catálogo y contacto se revisaron a 320×780, 768×1024 y 1440×900; el buscador del catálogo se ajustó para mantener la lupa dentro del campo. También se implementan movimiento reducido, metadatos por página, Open Graph y `robots.txt`. WhatsApp flotante se revela solo con número real. Canonical y Open Graph con imagen absoluta se generan cuando se configura `publicOrigin`; no hay sitemap con dominio vacío.

## Completo — Preview y checkpoint

- El sitio se sirve en el puerto Preview configurado y `manus-routes.json` enumera las páginas públicas HTML existentes.
- El resultado se guarda como checkpoint del proyecto. No se publica a un dominio público sin autorización explícita.

Evidencia: servidor estático responde en el puerto 3000; el manifiesto JSON enumera 14 páginas y devuelve HTTP 200 junto con las 14 páginas; sintaxis de JavaScript, auditoría estática de enlaces/fragmentos/recursos/IDs/categorías, mappings WebP y formato del manifiesto pasan. `publishing.auto_publish=false`; no se ha publicado a un dominio público. El commit inicial de implementación `035bdc5a12bba026ffb1dddbba15933b8cbd5805` y la revisión responsive `b4ca4088f8839743c4826c35e5b158ff66fc703f` se encuentran en `origin/main`; el seguimiento actualizado forma parte de la revisión final guardada en esa rama.
