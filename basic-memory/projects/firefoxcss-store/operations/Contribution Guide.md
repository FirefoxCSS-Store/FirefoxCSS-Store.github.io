---
title: Contribution Guide
type: guide
tags:
- firefoxcss-store
- contribution
- submissions
permalink: firefoxcss-store/projects/firefoxcss-store/operations/contribution-guide
---

# Contribution Guide

Contributions to the FirefoxCSS Store should preserve the project direction: a reviewed community hub for submitted themes that links back to original repositories. New theme submissions should use the GitHub Issue Form and pass through [[Theme Submission Workflow]]. Catalog and site changes should be validated through [[Tooling and Validation]].

Theme entries should be structured JSON files under `src/content/themes/`, following [[Theme Catalog Source of Truth]]. Only reviewed published entries render publicly. Maintainers explicitly merge approved submission pull requests, and the approval workflow handles publication fields such as status and catalog index.

Repository-facing communication should stay in English unless a specific repository area requires another language. Changes should be small, reversible, and traceable through commits.

## Observations
- [submission_path] New theme submissions should use the GitHub Issue Form #submissions
- [review_rule] Maintainers explicitly review and merge approved submission PRs #review
- [catalog_rule] Theme contributions should update structured JSON under `src/content/themes/` #catalog
- [visibility_rule] Only reviewed published entries render publicly #published
- [validation_rule] Catalog changes should run `npm test` #validation
- [build_rule] Site source changes should run `npm run build` #build
- [language_rule] Repository-facing contribution text should be in English by default #language
- [change_preference] Contributions should be minimal, reversible, and traceable #workflow

## Relations
- guided_by [[Project Working Agreement]]
- uses [[Theme Submission Workflow]]
- changes [[Theme Catalog Source of Truth]]
- validated_by [[Tooling and Validation]]