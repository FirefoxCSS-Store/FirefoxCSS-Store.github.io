---
title: FirefoxCSS Store Project Overview
type: project
tags:
- firefoxcss-store
- project
- overview
permalink: firefoxcss-store/projects/firefoxcss-store/firefox-css-store-project-overview
---

# FirefoxCSS Store Project Overview

FirefoxCSS Store is the static community hub maintained in the `FirefoxCSS-Store.github.io` repository. Its purpose is to help people discover and share Firefox `userChrome.css` themes while preserving attribution and ownership: the site links to original repositories and does not scrape, crawl, or automatically discover new themes.

The product direction is a user- and author-submitted catalog. Theme entries are structured JSON files under [[Theme Catalog Source of Truth]], rendered by the Astro application described in [[Astro Site Architecture]]. Submissions move through the review automation captured in [[Theme Submission Workflow]].

The generated site output is `dist/` during build and is not committed. Deployment targets the upstream organization site described in [[GitHub Pages Deployment]].

## Observations
- [repository] The project repository is `FirefoxCSS-Store.github.io` #repo
- [purpose] FirefoxCSS Store is a static community hub for discovering and sharing Firefox `userChrome.css` themes #product
- [product_direction] The hub accepts user and author submissions and links to original repositories #submissions
- [constraint] The project must not scrape, crawl, or automatically discover themes #policy
- [source_of_truth] Theme data is stored as one structured JSON entry per theme under `src/content/themes/` #data
- [build_output] The generated site output is `dist/` and generated files are not committed #build
- [naming_decision] The visible project naming remains `FirefoxCSS-Store` until an explicit future decision changes it #branding

## Relations
- uses [[Astro Site Architecture]]
- depends_on [[Theme Catalog Source of Truth]]
- publishes_via [[GitHub Pages Deployment]]
- accepts_submissions_through [[Theme Submission Workflow]]
- governed_by [[Project Working Agreement]]