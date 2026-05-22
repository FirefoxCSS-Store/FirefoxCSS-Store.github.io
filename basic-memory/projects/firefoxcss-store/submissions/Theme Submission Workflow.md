---
title: Theme Submission Workflow
type: workflow
tags:
- firefoxcss-store
- submissions
- workflow
permalink: firefoxcss-store/projects/firefoxcss-store/submissions/theme-submission-workflow
---

# Theme Submission Workflow

New themes are submitted through the `Submit a theme` GitHub Issue Form. Automation turns complete issues into candidate pull requests without Decap or external authentication hosting. The automation creates candidate theme entries and basic repository stats by reusing the same provider logic as `npm run refresh:themes`.

Approved submission PRs are finalized by `.github/workflows/publish-approved-theme-submission.yml`, which sets `status: "published"` and assigns the next available low `catalogIndex`. Maintainers still merge the PR explicitly. Merged submission PRs close their source issue through `.github/workflows/close-merged-theme-submission.yml`, and generated PR bodies include `Closes #<issue>`.

The issue-form automation was hardened on 2026-05-15 so user-correctable issue form errors exit as incomplete submissions, comment the required fix on the issue, and skip PR generation without hiding internal workflow failures.

## Observations
- [entry_point] New theme submissions use the `Submit a theme` GitHub Issue Form #submissions
- [automation] Complete submission issues become candidate PRs #submissions
- [constraint] The workflow avoids Decap and external authentication hosting #architecture
- [metadata] Submission automation populates basic repository stats for submitted repositories #stats
- [approval] Approved submission PRs are finalized by `publish-approved-theme-submission.yml` #approval
- [publication] Finalization sets `status: "published"` and assigns the next low `catalogIndex` #published
- [human_review] Maintainers still merge approved submission PRs explicitly #review
- [issue_closure] Merged submission PRs close their source issue through `close-merged-theme-submission.yml` #issues
- [hardening] On 2026-05-15, user-correctable issue form errors began exiting as incomplete submissions with a comment and no PR #history

## Relations
- contributes_to [[Theme Catalog Source of Truth]]
- creates [[Candidate Theme Entries]]
- publishes [[Published Theme Entries]]
- implemented_by [[GitHub Actions Automation]]
- uses [[Repository Stats and Audit Automation]]
- governed_by [[Project Working Agreement]]