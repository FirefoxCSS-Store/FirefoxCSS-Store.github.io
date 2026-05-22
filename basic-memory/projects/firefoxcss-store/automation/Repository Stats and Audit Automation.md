---
title: Repository Stats and Audit Automation
type: workflow
tags:
- firefoxcss-store
- automation
- repository-metadata
permalink: firefoxcss-store/projects/firefoxcss-store/automation/repository-stats-and-audit-automation
---

# Repository Stats and Audit Automation

Repository metadata refresh and audit automation operate only on repositories already present in submitted theme entries. They must never discover new repositories. The refresh script is `scripts/refresh-theme-stats.mjs`; it enriches existing entries with repository stars, update dates, owner avatars, and accessibility values. The monthly refresh workflow opens a PR when those values change.

The audit script is `scripts/audit-theme-repositories.mjs`. It checks repositories already present in submitted theme entries, including archived entries, so deleted archived repositories can still be proposed for removal. Published entries that become unavailable can be moved into the archive; archived entries that later become unavailable are proposed for removal.

If `GITHUB_TOKEN` is blocked from creating PRs, the audit automation still pushes the audit branch and reports a manual PR URL. Automatic PR creation requires enabling the repository setting that allows GitHub Actions to create and approve pull requests or adding an `AUDIT_PR_TOKEN` secret with PR creation permission.

## Observations
- [script] Repository metadata refresh uses `scripts/refresh-theme-stats.mjs` #stats
- [script] Repository audits use `scripts/audit-theme-repositories.mjs` #audit
- [schedule] Repository metadata refresh runs monthly #stats
- [schedule] Repository audits run monthly #audit
- [automation_boundary] Refresh and audit automation only inspect repositories already present in theme entries #policy
- [automation_boundary] Refresh and audit automation must not discover new repositories #policy
- [refresh_output] The stats refresh PR can change stars, update dates, owner avatars, or accessibility values #stats
- [audit_scope] The audit checks both published and archived entries #audit
- [archive_policy] Published unavailable repositories can be moved into the archive #archive
- [removal_policy] Archived unavailable repositories can be proposed for removal #archive
- [permission_risk] Automatic audit PR creation may require repository settings or an `AUDIT_PR_TOKEN` #github-actions

## Relations
- enriches [[Theme Catalog Source of Truth]]
- audits [[Published Theme Entries]]
- audits [[Archived Theme Entries]]
- implemented_by [[GitHub Actions Automation]]
- creates_risks_in [[Project Technical Risks]]