---
title: Published Theme Entries
type: catalog_status
tags:
- firefoxcss-store
- catalog
- published
permalink: firefoxcss-store/projects/firefoxcss-store/catalog/statuses/published-theme-entries
---

# Published Theme Entries

Published theme entries are the public catalog entries. They render on the home page, receive detail pages at `/themes/[slug]/`, and are included in generated outputs such as `/themes.json`.

Publication happens after human review through [[Theme Submission Workflow]]. The approval workflow sets `status: "published"` and assigns the next available low `catalogIndex`. Published entries are included in repository audits, and unavailable published repositories can be moved into the archive according to [[Theme Status and Archive Policy]].

## Observations
- [status] `published` entries render publicly #published
- [rendering] Published entries appear as theme cards on the home page #frontend
- [routing] Published entries receive `/themes/[slug]/` detail pages #routing
- [output] Published entries are included in generated `/themes.json` #catalog
- [approval] Publication follows human review and approval automation #review
- [ordering] Published entries receive a low available `catalogIndex` #ordering
- [audit] Published entries are included in repository audits #audit

## Relations
- part_of [[Theme Catalog Source of Truth]]
- governed_by [[Theme Status and Archive Policy]]
- created_from [[Candidate Theme Entries]]
- published_by [[Theme Submission Workflow]]
- rendered_by [[Astro Site Architecture]]