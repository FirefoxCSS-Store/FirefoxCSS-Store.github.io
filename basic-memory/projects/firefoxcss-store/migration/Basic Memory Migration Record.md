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

The migration intentionally did not delete `MEMORY.md` or `AGENTS.md`. The user explicitly required keeping those physical files until the migration is confirmed complete and successful.

## Observations
- [migration_date] The Basic Memory migration was performed on 2026-05-22 #migration
- [source] Migrated source file: `AGENTS.md` #migration
- [source] Migrated source file: `MEMORY.md` #migration
- [destination] Migrated notes live under `basic-memory/projects/firefoxcss-store/` in the repository-backed `firefoxcss-store` Basic Memory project #basic-memory
- [method] The migration uses atomic notes, observations, wiki links, and typed relations #basic-memory
- [constraint] Physical `MEMORY.md` and `AGENTS.md` were not deleted #migration
- [completion_condition] Physical memory files should only be removed after explicit confirmation that migration is complete and successful #migration

## Relations
- migrates [[Project Working Agreement]]
- migrates [[FirefoxCSS Store Project Overview]]
- migrates [[Repository State and History]]
- relates_to [[Contribution Guide]]