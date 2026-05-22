---
title: GitHub Actions Automation
type: guide
tags:
- firefoxcss-store
- github-actions
- automation
permalink: firefoxcss-store/projects/firefoxcss-store/automation/git-hub-actions-automation
---

# GitHub Actions Automation

The repository uses GitHub Actions for build, validation, theme submission processing, approval publication, merged-submission issue cleanup, repository metadata refresh, and repository audits.

Known workflow files include `.github/workflows/build.yml`, `.github/workflows/check-themes.yml`, `.github/workflows/create-theme-submission.yml`, `.github/workflows/publish-approved-theme-submission.yml`, `.github/workflows/close-merged-theme-submission.yml`, and `.github/workflows/refresh-theme-stats.yml`. The audit workflow is `.github/workflows/audit-theme-repositories.yml`.

CI workflows explicitly opt into Node 24 for JavaScript actions and use `actions/checkout@v6` plus `actions/setup-node@v6`. The build workflow runs on pushes to `main` that affect Astro site or build inputs and deploys `dist/` through GitHub Pages artifacts. PR validation runs `npm test` and `npm run build` for site-related changes.

The build workflow syntax requires `workflow_dispatch:` with a trailing colon; omitting the colon makes GitHub mark the workflow file invalid even when other checks pass.

## Observations
- [workflow] `.github/workflows/build.yml` builds and deploys the Astro site #ci
- [workflow] `.github/workflows/check-themes.yml` validates theme changes #ci
- [workflow] `.github/workflows/create-theme-submission.yml` creates candidate PRs from complete submission issues #submissions
- [workflow] `.github/workflows/publish-approved-theme-submission.yml` publishes approved submission PRs #submissions
- [workflow] `.github/workflows/close-merged-theme-submission.yml` closes source issues for merged submission PRs #submissions
- [workflow] `.github/workflows/refresh-theme-stats.yml` refreshes theme repository metadata monthly #stats
- [workflow] `.github/workflows/audit-theme-repositories.yml` audits theme repository availability monthly #audit
- [runtime] CI workflows explicitly use Node 24 for JavaScript actions #node
- [actions_version] CI uses `actions/checkout@v6` and `actions/setup-node@v6` #github-actions
- [syntax_risk] `workflow_dispatch:` must include a trailing colon in build workflow YAML #github-actions

## Relations
- automates [[Tooling and Validation]]
- deploys_with [[GitHub Pages Deployment]]
- includes [[Theme Submission Workflow]]
- includes [[Repository Stats and Audit Automation]]
- governed_by [[Project Working Agreement]]