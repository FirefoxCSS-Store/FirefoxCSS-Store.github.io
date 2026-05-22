---
title: Theme Catalog Source of Truth
type: architecture
tags:
- firefoxcss-store
- catalog
- themes
permalink: firefoxcss-store/projects/firefoxcss-store/catalog/theme-catalog-source-of-truth
---

# Theme Catalog Source of Truth

The catalog source of truth is the set of structured JSON files under `src/content/themes/`. Each file represents one Firefox CSS theme entry. Astro content collections validate the theme schema during build, and only entries with published status render publicly.

Theme entries may carry repository metadata, screenshots, accessibility values, status, catalog ordering, submitter role, and other structured fields required by the hub. Repository metadata can be refreshed for already submitted entries through [[Repository Stats and Audit Automation]], but automation must never discover new repositories.

## Observations
- [source_of_truth] `src/content/themes/*.json` is the catalog source of truth #catalog
- [structure] Each theme is represented by one structured JSON entry #data
- [validation] Astro content collections validate the theme schema during build #astro
- [visibility_rule] Only published entries render publicly #published
- [automation_boundary] Repository metadata automation may enrich existing theme entries but must not discover new repositories #policy
- [catalog_ordering] Approved entries receive the next available low `catalogIndex` when published #ordering

## Relations
- part_of [[FirefoxCSS Store Project Overview]]
- rendered_by [[Astro Site Architecture]]
- includes [[Published Theme Entries]]
- includes [[Candidate Theme Entries]]
- includes [[Archived Theme Entries]]
- includes [[Legacy Theme Entries]]
- enriched_by [[Repository Stats and Audit Automation]]
- validated_by [[Tooling and Validation]]