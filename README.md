# Valepeedia

Portafolio de reportajes y crónicas con estética de medio digital. La vista pública está
construida con Next.js y el contenido se administra desde Sanity Studio, embebido en el mismo
proyecto.

## Stack

- **Next.js 16** (App Router) — vista pública
- **Sanity** — modelo de contenido y panel de administración en `/studio`
- **TypeScript**

## Puesta en marcha

```bash
npm install
cp .env.local.example .env.local   # y completa los valores
npm run dev
```

El sitio queda en `http://localhost:3000` y el panel de administración en
`http://localhost:3000/studio`.

### Variables de entorno

| Variable | Para qué sirve |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID del proyecto en Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset a leer (`production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Fecha de versión de la API de Sanity |
| `SANITY_REVALIDATE_SECRET` | Firma del webhook que refresca el sitio al publicar |

## Estructura

```
app/
  (site)/            vista pública (portada, reportajes, categorías, sobre mí, contacto)
  studio/            Sanity Studio embebido — no indexado por buscadores
  api/revalidate/    webhook: refresca el sitio cuando se publica en Sanity
components/          ui, layout, articles, theme
lib/sanity/          cliente, queries GROQ y tipos
sanity/schemaTypes/  modelo de contenido (article, category, tag, author)
```

## Publicar contenido

Todo se hace desde `/studio`, sin tocar código. Solo **título**, **slug** y **estado** son
obligatorios; el resto de los campos son opcionales y el sitio se adapta si faltan (un reportaje
sin portada, por ejemplo, se muestra como tarjeta de texto). Un reportaje solo aparece en el
sitio público cuando su estado es **Publicado**.

## Estilos visuales

La vista pública tiene dos estilos —minimalista y clásica— que el visitante cambia con el
selector de arriba a la izquierda. Están implementados con variables CSS en `app/globals.css`,
no como plantillas duplicadas.

## Scripts

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run lint    # ESLint
```

`scripts/seed.mjs` carga las categorías, un autor y reportajes de ejemplo:

```bash
npx sanity exec scripts/seed.mjs --with-user-token
```
