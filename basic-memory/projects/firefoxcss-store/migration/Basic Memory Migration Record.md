---
title: Basic Memory Migration Record
type: migration
tags:
- firefoxcss-store
- basic-memory
- migration
permalink: firefoxcss-store/projects/firefoxcss-store/migration/basic-memory-migration-record
---

# Basic Memory Migration Record

On 2026-05-22, the knowledge from physical `AGENTS.md` and `MEMORY.md` was migrated into Basic Memory as a structured graph under `projects/firefoxcss-store/`. The graph was then moved into the repository workspace as the `firefoxcss-store` Basic Memory project at `basic-memory/`, making the Markdown memory files versionable with the repo. The migration used atomic notes, semantic wiki links, observations, and typed relations so future agents can retrieve context by topic instead of reading one monolithic memory file.

After the migration was confirmed, `MEMORY.md` was removed and `AGENTS.md` was updated to point future agents at the repository-backed `firefoxcss-store` Basic Memory project under `basic-memory/`.

## Observations
- [migration_date] The Basic Memory migration was performed on 2026-05-22 #migration
- [source] Migrated source file: `AGENTS.md` #migration
- [source] Migrated source file: `MEMORY.md` #migration
- [destination] Migrated notes live under `basic-memory/projects/firefoxcss-store/` in the repository-backed `firefoxcss-store` Basic Memory project #basic-memory
- [method] The migration uses atomic notes, observations, wiki links, and typed relations #basic-memory
- [cleanup] `MEMORY.md` was removed after migration confirmation #migration
- [entry_point] `AGENTS.md` now points agents at the repository-backed Basic Memory project #migration

## Relations
- migrates [[Project Working Agreement]]
- migrates [[FirefoxCSS Store Project Overview]]
- migrates [[Repository State and History]]
- relates_to [[Contribution Guide]]