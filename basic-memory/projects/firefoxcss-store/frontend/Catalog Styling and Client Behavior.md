---
title: Catalog Styling and Client Behavior
type: architecture
tags:
- firefoxcss-store
- frontend
- styles
permalink: firefoxcss-store/projects/firefoxcss-store/frontend/catalog-styling-and-client-behavior
---

# Catalog Styling and Client Behavior

Catalog presentation is split between Astro-rendered markup, global CSS, and a small client-side TypeScript layer. The home page statically renders published theme cards and then enhances them with search, tag filtering, and sorting in `src/scripts/hub.ts`.

Global visual styles are authored in `src/styles/global.css`. Public assets live under `public/`, with optimized legacy screenshots under `public/assets/img/themes/`. Because only published entries render publicly, visual behavior should be checked against [[Published Theme Entries]] and [[Astro Site Architecture]].

## Observations
- [style_location] Global CSS lives in `src/styles/global.css` #css
- [script_location] Catalog behavior lives in `src/scripts/hub.ts` #typescript
- [behavior] Client TypeScript supports search, tag filters, and sorting #frontend
- [rendering] Published cards are rendered statically before client enhancement #astro
- [asset_location] Public static assets live under `public/` #assets
- [asset_location] Optimized legacy screenshots live under `public/assets/img/themes/` #assets

## Relations
- part_of [[Astro Site Architecture]]
- presents [[Published Theme Entries]]
- uses [[Theme Catalog Source of Truth]]
- validated_by [[Tooling and Validation]]