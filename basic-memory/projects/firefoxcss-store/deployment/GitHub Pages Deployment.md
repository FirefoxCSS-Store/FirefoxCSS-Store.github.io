---
title: GitHub Pages Deployment
type: architecture
tags:
- firefoxcss-store
- deployment
- github-pages
permalink: firefoxcss-store/projects/firefoxcss-store/deployment/git-hub-pages-deployment
---

# GitHub Pages Deployment

The project deploys as the upstream organization site at `https://firefoxcss-store.github.io`. The Astro configuration uses that value as `site` and does not use an Astro `base`. The build workflow deploys the generated `dist/` artifact through GitHub Pages artifacts instead of committing generated files to the branch.

GitHub navigation and submission links point to `FirefoxCSS-Store/FirefoxCSS-Store.github.io`. These upstream deployment values were restored on 2026-05-02.

## Observations
- [deployment_target] The deployment target is `https://firefoxcss-store.github.io` #github-pages
- [config] `astro.config.mjs` uses `site: https://firefoxcss-store.github.io` with no `base` #astro
- [artifact_policy] The build workflow deploys `dist/` through GitHub Pages artifacts #deployment
- [artifact_policy] Generated files are not committed back to the branch #deployment
- [link_target] GitHub navigation and submission links point to `FirefoxCSS-Store/FirefoxCSS-Store.github.io` #repo
- [history] Upstream deployment values were restored on 2026-05-02 #history

## Relations
- publishes [[Astro Site Architecture]]
- deploys [[FirefoxCSS Store Project Overview]]
- implemented_by [[GitHub Actions Automation]]