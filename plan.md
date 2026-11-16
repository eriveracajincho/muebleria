# Plan de implementación — Madera Luz

## Alcance y arquitectura

Sitio público multipágina, estático y mobile-first, escrito en HTML5, CSS3 y JavaScript Vanilla. No se incorpora backend, base de datos ni framework. El contenido relevante de cada URL estará presente en su HTML inicial para facilitar navegación y SEO. Las consultas comerciales y el formulario de cotización prepararán un mensaje y abrirán WhatsApp; no guardarán ni transmitirán datos a un servidor. El Libro de Reclamaciones será un formulario de preparación con salida imprimible local y aviso visible: hasta integrar un backend real no recibe, conserva ni registra oficialmente reclamaciones.

La arquitectura preservará la separación pedida por el usuario:

- `index.html`, `nosotros.html`, `catalogo.html`, `servicios.html`, `proyectos.html`, `galeria.html`, `contacto.html` y `libro-reclamaciones.html` como páginas con contenido semántico propio.
- `legales/privacidad.html`, `datos-personales.html`, `terminos.html`, `cambios-devoluciones.html`, `garantias.html` y `entregas.html` como borradores independientes, más el Libro de Reclamaciones situado en la raíz.
- `css/style.css`, `responsive.css` y `componentes.css` para base visual, adaptación y patrones compartidos. `responsive.css` cubre anchos compactos desde 280–320 CSS px, móviles, tabletas, escritorio, orientación horizontal, áreas seguras y punteros táctiles; los contenedores mantienen límites fluidos en monitores amplios.
- `js/configuracion.js` para los datos editables del negocio; `productos.js` para el catálogo; `catalogo.js` para búsqueda, filtros, orden y modal; `formularios.js` para validación y composición de mensajes; `main.js` para navegación, FAQ, galería, animaciones y utilidades.
- `assets/img/` para fotografías locales optimizadas y `assets/logo/` para la marca gráfica editable.
- `manus-routes.json` para declarar las páginas públicas servidas.

Se usarán páginas HTML independientes con enlaces relativos a recursos compartidos. No habrá una dependencia de bundler: para probar el sitio basta servir la carpeta raíz con un servidor HTTP estático, además de poder abrir las páginas directamente cuando las restricciones del navegador lo permitan.

## Dirección visual

**Movimiento de diseño:** editorial artesanal contemporáneo, con calidez de taller y composición de revista de interiores.

**Principios:** fotografías amplias y distintas de mobiliario, identificadas como referencias si no son proyectos verificados; jerarquía tipográfica y márgenes generosos; información comercial honesta y fácil de escanear; interacciones discretas y controles accesibles.

**Filosofía de color:** los tonos madera y beige aportan materialidad y oficio; crema y blanco dan luz y legibilidad; carbón sostiene la jerarquía y el contraste. Se conserva la paleta solicitada: `#6B4226`, `#D9B98C`, `#F5F1E9`, `#FFFFFF` y `#292929`.

**Paradigma de composición:** portada editorial asimétrica, con titular y llamada a la acción en una columna y fotografía de ambiente en la otra; secciones alternadas entre bandas amplias, listas horizontales y mosaicos de imágenes. El catálogo usará tarjetas responsivas por tratarse de productos comparables.

**Motivos de marca:** monograma geométrico que sugiera veta/ensamble; filetes finos color beige; marcos de fotografía con esquinas sobrias.

**Interacción y animación:** navegación suave y foco visible; menús y modales operables por teclado; apariciones breves al entrar en pantalla que respeten `prefers-reduced-motion`; hover corto sin cambios de layout.

**Tipografía:** `DM Sans` para interfaz y párrafos, combinada con `DM Serif Display` para titulares, servidas desde Google Fonts con alternativas del sistema.

**Esencia:** muebles a medida para hogares y espacios de trabajo que buscan aprovechar mejor cada ambiente, con diseño y fabricación configurables. Personalidad: cálida, precisa y honesta.

**Voz de marca:** directa, cercana y centrada en el proyecto. Ejemplos: “Cada espacio tiene una medida. Diseñemos la tuya.” / “Cuéntanos qué necesitas y preparamos una cotización contigo.”

**Wordmark:** símbolo lineal de una esquina de mueble/ensamble con la letra M, acompañado por el nombre comercial editable del propietario. `Madera Luz` es solo el nombre interno del proyecto y no se presenta como marca real.

**Color propio:** nogal profundo `#6B4226`, equilibrado con fondos cálidos claros.

## Interacciones y límites funcionales

- El catálogo tendrá nueve categorías: roperos y closets; cocinas; escritorios; centros de entretenimiento; dormitorios; cómodas y veladores; oficinas; negocios; y muebles personalizados. Cada ficha indicará medidas referenciales, colores disponibles, precio referencial o “Solicitar cotización”, y acciones para abrir detalles o consultar por WhatsApp.
- Los formularios de cotización y contacto validarán los campos requeridos, escaparán la salida y construirán enlaces `wa.me` solo si el número de negocio está configurado. No simularán envío cuando falte el contacto.
- La constancia del Libro de Reclamaciones podrá imprimirse o guardarse desde el navegador del usuario; debe decir “BORRADOR — no presentado ni registrado oficialmente”. Los datos ingresados permanecerán en memoria de la página y no se enviarán ni persistirán.
- Configuración de marca y contacto empezará con valores vacíos o etiquetas “Completar antes de publicar”. No se afirmará una dirección, RUC, horario, cuenta social, política propia ni testimonio real.
- La normativa se contrastará con fuentes oficiales disponibles; se describirá el formulario como plantilla pendiente de revisión legal y técnica, no como certificación de cumplimiento.

## Estructura de proyecto prevista

```text
maderaluz/
├── index.html
├── nosotros.html
├── catalogo.html
├── servicios.html
├── proyectos.html
├── galeria.html
├── contacto.html
├── libro-reclamaciones.html
├── legales/
│   ├── privacidad.html
│   ├── datos-personales.html
│   ├── terminos.html
│   ├── cambios-devoluciones.html
│   ├── garantias.html
│   └── entregas.html
├── css/
│   ├── style.css
│   ├── componentes.css
│   └── responsive.css
├── js/
│   ├── configuracion.js
│   ├── productos.js
│   ├── catalogo.js
│   ├── formularios.js
│   └── main.js
├── assets/
│   ├── img/
│   └── logo/
├── manus-routes.json
├── plan.md
└── TODO.md
```

## Flujo de implementación

Tras el plan aprobado: establecer criterios de entrega; consultar normativa peruana en fuentes oficiales y registrar referencias; configurar diagnósticos HTML/CSS/JavaScript/JSON; preparar fotos y marca; implementar primero shell y estilos compartidos, luego páginas informativas, módulos JS, catálogo e interacciones, y finalmente páginas legales y libro; iniciar servidor estático de Preview en el puerto configurado; comprobar enlaces, formularios, responsive y páginas; guardar el resultado como checkpoint del proyecto. No se publicará en un dominio público sin petición explícita.
