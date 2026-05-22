---
title: Project Technical Risks
type: risk_register
tags:
- firefoxcss-store
- risks
- operations
permalink: firefoxcss-store/projects/firefoxcss-store/operations/project-technical-risks
---

# Project Technical Risks

The main persistent risks concern GitHub permissions, external API use, repository availability, and legacy catalog metadata. These risks affect automation reliability and catalog maintenance rather than the core static site architecture.

Automatic submission PR creation depends on repository workflow permissions. If `GITHUB_TOKEN` cannot create PRs, the workflow still pushes `submissions/theme-<issue-number>` and reports a manual PR URL. Fully automatic PR creation requires enabling GitHub Actions PR creation or adding `SUBMISSION_PR_TOKEN`.

Repository refresh and audit scripts use external APIs when run manually or by scheduled workflows. They must remain limited to repositories already present in submitted theme entries. Existing legacy theme entries are marked with `submitterRole: "legacy"` because the original submitter relationship is unknown.

## Observations
- [risk] Automatic submission PR creation depends on repository workflow permissions #github-actions
- [fallback] If `GITHUB_TOKEN` cannot create submission PRs, the workflow pushes `submissions/theme-<issue-number>` and reports a manual PR URL #submissions
- [mitigation] Fully automatic submission PR creation needs Actions PR creation enabled or `SUBMISSION_PR_TOKEN` #github-actions
- [risk] Repository metadata refresh uses external APIs when run manually or on schedule #api
- [constraint] Repository refresh and audit scripts must never discover new repositories #policy
- [risk] Audit PR creation may need Actions PR creation enabled or `AUDIT_PR_TOKEN` #github-actions
- [risk] Existing legacy theme entries have unknown original submitter relationships #legacy
- [legacy_marker] Existing legacy theme entries use `submitterRole: "legacy"` #legacy

## Relations
- affects [[GitHub Actions Automation]]
- affects [[Theme Submission Workflow]]
- affects [[Repository Stats and Audit Automation]]
- affects [[Legacy Theme Entries]]
- governed_by [[Project Working Agreement]]