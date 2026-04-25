# AGENTS

This repository uses this file as the entry point for future coding agents.

Before starting work:

1. Read [MEMORY.md](./MEMORY.md).
2. Use that file as persistent project context across conversations.
3. Keep `MEMORY.md` updated manually after any relevant change, decision, blocker, or workflow update.

Operational notes:

- Prefer minimal, reversible changes.
- Validate with `npm test` for `themes.json` checks.
- Use `npm run build` when touching generated site assets or source files under `dev/`.
- When automation changes are introduced, document the intent and impact in `MEMORY.md`.
- Use English for repository-facing output by default, including code, comments, commit messages, pull request text, documentation, workflow messages, and user-facing project strings unless the repository already requires another language in a specific place.
- In chat, always reply in the same language used by the user.
- After implementing relevant changes or new functionality, create a commit and push it so work remains traceable and easy to roll back if needed.
- Never perform a merge without explicit user authorization.
- Never take actions that could affect the repository's production main branch without explicit user authorization.
