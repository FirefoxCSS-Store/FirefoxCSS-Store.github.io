---
title: Astro Site Architecture
type: architecture
tags:
- firefoxcss-store
- astro
- architecture
permalink: firefoxcss-store/projects/firefoxcss-store/architecture/astro-site-architecture
---

# Astro Site Architecture

The site is an Astro application under `src/`. Astro routes live in `src/pages/`, global styles live in `src/styles/global.css`, and catalog client behavior is implemented in `src/scripts/hub.ts`.

The home page renders all published theme cards statically and then uses a small TypeScript layer for search, tag filters, and sorting. Each published theme receives a `/themes/[slug]/` detail page, and the build also generates `/themes.json` for structured catalog consumption.

The architecture depends on [[Theme Catalog Source of Truth]] for content and is validated by [[Tooling and Validation]]. Public static assets, including optimized legacy screenshots, live under `public/` and `public/assets/img/themes/`.

## Observations
- [framework] The site source is an Astro application under `src/` #astro
- [routing] Site pages are authored as Astro routes in `src/pages/` #routing
- [style_location] Global styles are authored in `src/styles/global.css` #css
- [client_behavior] Catalog search, filtering, and sorting are implemented in `src/scripts/hub.ts` #typescript
- [rendering] The home page statically renders published theme cards and enhances them with client-side TypeScript #frontend
- [output] Each published theme receives a `/themes/[slug]/` detail page #routing
- [output] The site generates `/themes.json` during build #catalog
- [assets] Public static assets live under `public/` #assets
- [assets] Optimized legacy screenshots live under `public/assets/img/themes/` #assets

## Relations
- part_of [[FirefoxCSS Store Project Overview]]
- depends_on [[Theme Catalog Source of Truth]]
- validated_by [[Tooling and Validation]]
- publishes_with [[GitHub Pages Deployment]]