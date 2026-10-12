# ORVAN

Catálogo web de ORVAN (React + Vite): mismo diseño del catálogo v0.1, pedidos por WhatsApp y
productos administrados desde datos estructurados.

## Uso

Requiere Node 20.19 o superior.

```bash
npm install
npm run dev       # desarrollo: http://localhost:5173
npm run build     # versión de producción en dist/
npm run preview   # sirve dist/ para revisarla
npm test          # pruebas (incluye validación de products.json e imágenes)
npm run lint
```

`dist/` usa rutas relativas: se puede publicar en la raíz de un dominio o en una subcarpeta.

## Dónde se edita cada cosa

| Quiero cambiar…                         | Archivo                                   |
| --------------------------------------- | ----------------------------------------- |
| Número y mensajes de WhatsApp           | `src/config/whatsapp.js`                  |
| Nombre, logo, ciudad, correo, redes     | `src/config/brand.js`                     |
| Colores (morado `#9900FF`, azul `#0A6CFF`) | `src/styles/tokens.css`                 |
| Menú, carpetas de imágenes, moneda      | `src/config/site.js`                      |
| Productos                               | `src/data/products.json`                  |
| Categorías                              | `src/data/categories.json`                |
| Textos de pilares, ventajas y cifras    | `src/data/content.json`                   |
| Imágenes de producto                    | `public/assets/images/productos/`         |
| Logo                                    | `src/assets/images/logo/`                 |

### WhatsApp

`phoneNumber` es `573244584528` (+57 324 458 4528). Se escribe con indicativo y solo dígitos. Si se
deja vacío, los botones de pedido muestran el aviso "Nuestro canal de contacto estará disponible muy
pronto". Con el número configurado, todos los botones abren WhatsApp con:

```
Hola, estoy interesado en comprar el producto: Compresor de aire portátil.
Código: AUT-001
Precio: $ 89.900
```

La plantilla admite los marcadores `{producto}`, `{codigo}` y `{precio}`.

## Productos

Cada producto de `src/data/products.json` admite estos campos. Solo `id`, `name`, `price`, `image`
y `category` son obligatorios; el resto es opcional.

| Campo          | Uso                                                                  |
| -------------- | -------------------------------------------------------------------- |
| `id`           | Referencia única (se muestra como código y va en el mensaje)         |
| `name`         | Nombre                                                               |
| `subtitle`     | Línea bajo el nombre                                                 |
| `category`     | `id` de una categoría de `categories.json`                           |
| `brand`        | Marca del fabricante, si aplica                                      |
| `price`        | Precio en pesos, número sin puntos: `89900`                          |
| `available`    | `false` muestra "Agotado" y desactiva el pedido                      |
| `featured`     | Resalta la primera etiqueta                                          |
| `badges`       | Etiquetas sobre la foto                                              |
| `summary`      | Texto corto de la tarjeta (si falta se usa `description`)            |
| `description`  | Texto de la ficha                                                    |
| `features`     | Características principales (ficha)                                  |
| `highlights`   | Etiquetas cortas de la tarjeta                                       |
| `includes`     | Qué incluye la caja                                                  |
| `specsSource`  | De dónde salen las especificaciones                                  |
| `image`        | Nombre exacto del archivo de la foto principal                       |
| `imageLarge`   | Versión grande de la foto principal (opcional)                       |
| `imageAlt`     | Descripción de la foto principal                                     |
| `gallery`      | Fotos de la ficha: `{ "kind", "image", "imageLarge", "alt" }`        |

`kind` puede ser `studio` (se muestra "Catálogo"), `scene` ("En uso", la que usa el carrusel) o
`real` ("Foto real"). Si un producto no tiene `gallery`, la ficha muestra solo la foto principal.

Para agregar un producto: copia un bloque, cambia los campos y coloca sus imágenes en
`public/assets/images/productos/` con exactamente el mismo nombre que pusiste en el JSON.
`npm test` avisa si falta alguna imagen, si se repite un `id` o si la categoría no existe.

Contenido: solo características verificables (empaque, fotos reales, ficha del proveedor). Precios
aprobados el 2026-10-03 (decisión D-004); los de audio (AUD-001, PAR-001, PAR-002) salen de la hoja
"Precio productos" del Excel original y siguen pendientes de aprobación.

## Estructura

```
src/
├── assets/            logo e iconos (los procesa Vite)
├── components/
│   ├── contact/       WhatsAppButton
│   ├── layout/        Header, Footer
│   ├── product/       tarjeta, cuadrícula, filtros, ficha, galería, diapositiva
│   ├── seo/           datos estructurados schema.org
│   └── ui/            Icon, IconSprite, Reveal
├── config/            marca, sitio y WhatsApp
├── context/           catálogo y avisos compartidos
├── data/              JSON de productos, categorías y textos
├── hooks/             filtros, carrusel, animaciones
├── pages/Home/        página de inicio y sus secciones
├── services/          capa de datos (catalogService)
├── styles/            CSS por área; tokens.css = paleta de marca
└── utils/             WhatsApp, formato de precios, catálogo
```

Las imágenes de producto viven en `public/` porque el JSON las referencia por nombre: Vite publica
esa carpeta tal cual, sin renombrar archivos.

## Migrar a una API o base de datos

La interfaz solo consume `getCatalog()` de `src/services/catalogService.js`, que normaliza los datos.
Para leer de una API, Firebase, Supabase o un CMS, reemplaza `fetchRawProducts` y
`fetchRawCategories` por la llamada correspondiente; los componentes no cambian. Las imágenes
pueden ser URL completas (CDN) y se usan tal cual.
