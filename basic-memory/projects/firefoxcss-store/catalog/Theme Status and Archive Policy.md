---
title: Theme Status and Archive Policy
type: guide
tags:
- firefoxcss-store
- catalog
- status
permalink: firefoxcss-store/projects/firefoxcss-store/catalog/theme-status-and-archive-policy
---

# Theme Status and Archive Policy

Theme visibility and maintenance are controlled through catalog status and related metadata. Published entries render publicly. Candidate entries are produced by submission automation and require human review before publication. Archived-but-existing repositories remain preserved under `/archive/` with unsupported messaging. Unavailable or deleted repositories are proposed for removal by pull request.

Repository audits include both published and archived entries. Only published entries are moved into the archive. If an archived entry later becomes unavailable, it is proposed for removal.

## Observations
- [status_rule] Published entries render publicly #published
- [status_rule] Candidate entries are not public until reviewed and published #candidate
- [archive_rule] Archived-but-existing repositories are preserved under `/archive/` with unsupported messaging #archive
- [removal_rule] Unavailable or deleted repositories are proposed for removal by PR #archive
- [audit_rule] Repository audits include both published and archived entries #audit
- [audit_rule] Only published entries are moved into the archive #audit
- [removal_rule] Archived entries that later become unavailable are proposed for removal #archive

## Relations
- explains [[Theme Catalog Source of Truth]]
- includes [[Published Theme Entries]]
- includes [[Candidate Theme Entries]]
- includes [[Archived Theme Entries]]
- includes [[Legacy Theme Entries]]
- enforced_by [[Repository Stats and Audit Automation]]