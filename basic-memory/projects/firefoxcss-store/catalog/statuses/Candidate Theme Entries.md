---
title: Candidate Theme Entries
type: catalog_status
tags:
- firefoxcss-store
- catalog
- candidate
permalink: firefoxcss-store/projects/firefoxcss-store/catalog/statuses/candidate-theme-entries
---

# Candidate Theme Entries

Candidate theme entries are created from complete GitHub Issue Form submissions by [[Theme Submission Workflow]]. They are proposed in generated pull requests and require human review before becoming public.

Candidate entries are not rendered publicly until maintainers approve them and the publication workflow sets `status: "published"`. Candidate PRs may include basic repository stats gathered from the submitted repository using the same provider logic as `npm run refresh:themes`.

## Observations
- [status] Candidate entries are proposed theme entries awaiting review #candidate
- [creation] Candidate entries are generated from complete submission issues #submissions
- [visibility] Candidate entries do not render publicly before approval #candidate
- [review] Candidate entries require human maintainer review #review
- [metadata] Candidate PRs may include basic repository stats for the submitted repository #stats
- [transition] Approved candidate entries become published entries #published

## Relations
- part_of [[Theme Catalog Source of Truth]]
- governed_by [[Theme Status and Archive Policy]]
- created_by [[Theme Submission Workflow]]
- can_become [[Published Theme Entries]]
- enriched_by [[Repository Stats and Audit Automation]]