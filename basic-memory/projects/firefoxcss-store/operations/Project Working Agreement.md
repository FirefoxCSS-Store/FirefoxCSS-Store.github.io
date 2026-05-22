---
title: Project Working Agreement
type: guide
tags:
- firefoxcss-store
- working-agreement
- agents
permalink: firefoxcss-store/projects/firefoxcss-store/operations/project-working-agreement
---

# Project Working Agreement

Future coding agents should use the repository-backed `firefoxcss-store` Basic Memory project before making assumptions about project state. Start from `memory://firefoxcss-store/projects/firefoxcss-store/firefox-css-store-project-overview`, gather linked notes with `build_context`, and keep the topic-focused notes under `basic-memory/` updated after relevant changes, decisions, blockers, or workflow updates. `AGENTS.md` remains the repository entry point for agent instructions.

Work should favor minimal, reversible changes. Use English for repository-facing output by default, including code, comments, commit messages, pull request text, documentation, workflow messages, and user-facing project strings, unless a specific part of the repository already requires another language. In chat, reply in the same language used by the user.

After implementing relevant changes or new functionality, agents should create a commit and push so work remains traceable and easy to roll back. Agents must never merge without explicit user authorization and must never take actions that could affect the repository's production main branch without explicit user authorization.

## Observations
- [startup_rule] Future agents should read `MEMORY.md` before making assumptions #agents
- [memory_rule] Future agents should keep persistent memory updated after relevant changes, decisions, blockers, or workflow updates #agents
- [change_preference] Prefer minimal, reversible changes #workflow
- [validation_rule] Validate theme JSON checks with `npm test` #validation
- [build_rule] Run `npm run build` when touching generated site assets or source files under `dev/` #build
- [automation_documentation] Document automation intent and impact in persistent memory when automation changes are introduced #automation
- [language_rule] Use English for repository-facing output by default #language
- [chat_rule] Reply in chat using the same language as the user #language
- [traceability_rule] Create a commit and push after implementing relevant changes or new functionality #git
- [merge_rule] Never merge without explicit user authorization #git
- [production_rule] Never take actions that could affect the production main branch without explicit user authorization #git
- [migration_constraint] Do not delete physical `MEMORY.md` or `AGENTS.md` until the Basic Memory migration is confirmed complete and successful #migration

## Relations
- governs [[FirefoxCSS Store Project Overview]]
- governs [[Tooling and Validation]]
- governs [[GitHub Actions Automation]]
- governs [[Contribution Guide]]
- tracks_risks_in [[Project Technical Risks]]