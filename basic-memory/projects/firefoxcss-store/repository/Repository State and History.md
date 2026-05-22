---
title: Repository State and History
type: note
tags:
- firefoxcss-store
- repository
- history
permalink: firefoxcss-store/projects/firefoxcss-store/repository/repository-state-and-history
---

# Repository State and History

This note captures durable repository context that does not fit neatly into architecture, tooling, or automation notes. It includes active upstream work, previous cleanup, local repository conventions, and naming decisions that future agents should preserve until explicitly changed.

As of the source memory, the active upstream pull request for the community hub is FirefoxCSS-Store/FirefoxCSS-Store.github.io#330 from `Neikon:main` to `FirefoxCSS-Store:main`. Stale fork helper branches that had already been merged into `origin/main` were deleted on 2026-05-02: `rebuild-astro-community-hub`, `codex/issue-submission-automation`, `automation/theme-repository-audit-2026-04`, `automation/theme-stats-refresh-2026-04`, and `submissions/theme-2`.

The project naming was kept as `FirefoxCSS-Store` on 2026-05-02. A visible rename to `FirefoxCSS Hub` is deferred until a later explicit decision. The local `.codex` file is ignored in `.gitignore`.

## Observations
- [active_pr] The active upstream community hub PR is FirefoxCSS-Store/FirefoxCSS-Store.github.io#330 from `Neikon:main` to `FirefoxCSS-Store:main` #github
- [branch_cleanup] Stale merged helper branches were deleted on 2026-05-02 #git
- [deleted_branch] Deleted merged helper branch: `rebuild-astro-community-hub` #git
- [deleted_branch] Deleted merged helper branch: `codex/issue-submission-automation` #git
- [deleted_branch] Deleted merged helper branch: `automation/theme-repository-audit-2026-04` #git
- [deleted_branch] Deleted merged helper branch: `automation/theme-stats-refresh-2026-04` #git
- [deleted_branch] Deleted merged helper branch: `submissions/theme-2` #git
- [naming_decision] Project naming stays `FirefoxCSS-Store` until an explicit future decision #branding
- [deferred_decision] A visible rename to `FirefoxCSS Hub` is deferred #branding
- [local_file] Local `.codex` is ignored in `.gitignore` #local

## Relations
- documents [[FirefoxCSS Store Project Overview]]
- governed_by [[Project Working Agreement]]
- relates_to [[GitHub Pages Deployment]]