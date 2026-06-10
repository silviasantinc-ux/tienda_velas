# Checklist pre-lanzamiento — llum & glow

Banner "próximamente" eliminado. Tienda operativa con pedidos por email (sin pasarela de pago de momento).

---

## Pasarela de pago
- [ ] Integrar Stripe (o similar): checkout, confirmación de pedido, webhooks
- [ ] Probar flujo completo: añadir → carrito → pago → confirmación → email
- [ ] Gestión de errores de pago (tarjeta rechazada, timeout, etc.)
- [x] Quitar banner "próximamente" ✓

> De momento los pedidos se gestionan por email via Resend (formulario en el carrito → info@llumandglow.com).

## Envíos
- [x] Definir tarifas y zonas de envío (España, Baleares, Canarias) ✓
- [x] Actualizar página `/envios` con tarifas orientativas ✓
- [ ] Conectar coste de envío con el carrito (cálculo automático) — de momento hay enlace a `/envios`

## Contenido
- [ ] Revisar todos los textos — eliminar placeholders, coherencia ES/CA
- [ ] Revisar imágenes de productos — todas en formato cuadrado 1200×1200 px, JPG/WebP, máx. 300 KB, fondo neutro centrado
- [ ] Crear imagen OG 1200×630 px para redes sociales (actualmente usa `todas_las_velas.jpg`)
- [ ] Completar página `/seguridad` con fichas MSDS reales
- [ ] Revisar `/privacidad`, `/terminos` y `/cookies` — contenido legal revisado por asesor

## Stock y productos
> El stock se gestiona manualmente desde el admin al recibir cada pedido por email.
- [ ] Verificar que todos los productos activos tienen imagen, precio y categoría correcta
- [ ] Poner stock inicial correcto en Supabase para cada producto
- [x] Productos agotados muestran "Agotado" y no permiten añadir al carrito ✓
- [x] Productos inactivos no aparecen en tienda (filtro `activo = true` en todas las queries) ✓

## SEO
- [x] Registrar dominio en Google Search Console y verificar ownership ✓
- [ ] Enviar sitemap.xml desde Search Console (ir a Sitemaps → escribir sitemap.xml → Enviar)
- [ ] Verificar que og:image se ve bien al compartir en WhatsApp / Twitter / LinkedIn
  (usar https://developers.facebook.com/tools/debug/ y https://cards-dev.twitter.com/validator)
- [ ] Revisar títulos y descripciones de todas las páginas (< 60 / < 160 caracteres)
- [ ] Añadir JSON-LD `AggregateRating` en productos cuando haya reseñas reales

## Funcional
- [ ] Probar carrito completo en móvil (añadir, modificar cantidad, eliminar)
- [ ] Probar buscador de la tienda en móvil
- [ ] Probar filtros de categoría en móvil
- [x] Contador de evento: se oculta automáticamente cuando no hay evento próximo ✓
- [ ] Probar registro / login / recuperación de contraseña
- [ ] Newsletter: el componente existe pero no está integrado en ninguna página, ni envía nada real — decidir si se quiere usar y con qué servicio (Mailchimp, Resend, etc.)
- [x] Cookie banner: usa localStorage, no reaparece si ya se aceptó ✓

## Técnico
- [ ] Activar Google Analytics o Plausible para medir tráfico desde el día 1
- [ ] Configurar Google My Business si hay área de servicio/entrega
- [x] `/admin` protegido con middleware — redirige a login si no hay sesión ✓
- [ ] Revisar Core Web Vitals con Lighthouse en móvil (objetivo: LCP < 2.5s)
- [x] Comprobar que no hay errores 404 en enlaces internos (footer, navbar, home) ✓

## Redes sociales
- [ ] Crear perfil de Instagram / TikTok si no existe
- [ ] Añadir links de RRSS en footer y en `sameAs` del JSON-LD de Organization
- [ ] Primera publicación coordinada con apertura de tienda
