@AGENTS.md

# Repositorio
https://github.com/silviasantinc-ux/tienda_velas

# Reglas del proyecto

## Internacionalización (i18n)
Cualquier texto nuevo o modificado en `lib/i18n.ts` DEBE añadirse en los dos idiomas: español (`es`) y catalán (`ca`). Nunca añadir una clave solo en uno de los dos.

## Antes de hacer push
Antes de cada `git push`, verificar que todos los archivos modificados están staged (`git status`). En particular, si se toca un componente que usa claves de `lib/i18n.ts`, asegurarse de que i18n.ts también está en el commit. Después del push, revisar el log de build de Vercel para confirmar que el deploy ha sido exitoso.

## Productos siempre dinámicos
Los productos mostrados en cualquier página (homepage, tienda, colecciones…) deben cargarse siempre desde Supabase. No usar nunca `productosMock` para mostrar productos al usuario. Además, si un producto tiene variantes, la tarjeta debe redirigir a la ficha del producto en lugar de añadir al carrito directamente — para ello hay que cargar siempre el set `productosConVariantes` desde la tabla `producto_variantes` y pasarlo como prop `tieneVariantes` a `TarjetaProducto`.
