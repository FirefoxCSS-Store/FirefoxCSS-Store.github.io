# Persistent Memory

This file stores durable project context so future conversations can resume work with less re-discovery.

## Project Summary

- Repository: `FirefoxCSS-Store.github.io`
- Purpose: static site that catalogs Firefox `userChrome.css` themes
- Main data source: `themes.json`
- Site source: `dev/`
- Generated site output: `docs/`

## Tooling And Validation

- Package manager: `npm`
- Build command: `npm run build`
- Test command: `npm test`
- Build system: `gulp`
- Theme validation script: `tests/themes.check.js`
- Theme metadata refresh script: `scripts/sort_themes.nu`
- Dev container config: `.devcontainer/devcontainer.json`
- Devcontainer bootstrap script: `.devcontainer/post-create.sh`
- Devcontainer automation now runs `.devcontainer/post-create.sh` from `postCreateCommand` to ensure `jq`, `nu`, and project dependencies are installed after container creation/rebuild
- The build toolchain now runs cleanly on Node 24 with `gulp@5`, `gulp-sass@6`, `gulp-terser`, and a custom `sharp`-based WebP conversion step
- `npm audit` is currently clean after adding targeted `overrides` for `markdown-it` and `@parcel/watcher` transitive dependencies

## Automation Context

- Active working branch created for automation improvements: `improve-automation`
- Existing GitHub Actions:
- `.github/workflows/build.yml`
- `.github/workflows/check-themes.yml`
- CI now uses current `actions/checkout@v4` and `actions/setup-node@v4` on Node 24
- Build workflow now runs automatically on pushes to `main` that affect site/build inputs and commits regenerated `docs/` output back to the branch
- PR validation now runs `npm test` and `npm run build` for site-related changes instead of only checking `themes.json`
- The build workflow syntax also requires `workflow_dispatch:` with a trailing colon; missing it makes GitHub mark the workflow file as invalid even if other checks still pass

## Repo Notes

- Local `.codex` file is ignored in `.gitignore`
- Build workflow currently commits generated files back to the branch after `npm run build`
- Pull requests touching `themes.json` trigger validation via `npm test`
- Site pages are generated from Pug in `dev/pug/`
- Client behavior is implemented in `dev/js/main.js`
- Styles are authored in SCSS under `dev/scss/`
- Published site assets live in committed `docs/`
- Local containerized development is configured to install Node, npm, `jq`, and Nushell
- The devcontainer also runs `npm ci` automatically, so rebuilds recreate `node_modules` without manual setup
- `gulpfile.js` now lazy-loads ESM-only Gulp plugins and skips optional directories like `dev/fonts/` when they are absent
- Hidden config generation now filters non-`.txt` files explicitly so builds do not create stray files like `docs/.robots`
- Theme entries that depended on fragile remote screenshots have been localized into `images/themes/remote-*` and now build into committed assets under `docs/assets/img/themes/`
- Binary copies for static images now use `fs.promises.copyFile` instead of `gulp.src().pipe(dest())` because the stream path was corrupting some `.webp` assets in `docs/`
- Project-facing text should be written in English by default; chat replies should mirror the user's language

## Architecture Snapshot

- `themes.json` is the single catalog source used by the client and copied to `docs/themes.json` during build
- The frontend is a mostly static site with a small client-side app that fetches `themes.json`, sorts, filters, and renders cards in the browser
- Gulp handles Pug compilation, SCSS compilation, Babel transpilation, JS minification with Terser, image conversion/copy with Sharp, and config file copying
- Images from `images/` are emitted to `docs/assets/img/`; many local screenshots are converted to WebP
- `scripts/sort_themes.nu` enriches theme entries with `pushed_at`, `stargazers_count`, and `avatar` using GitHub/GitLab/Codeberg APIs or git cloning fallback

## Known Technical Risks

- Theme rendering is intentionally throttled with `444ms` per card, which scales poorly for a catalog of 100+ entries
- Search/filter logic depends on client-side fetch and has no visible loading or error handling
- Test coverage is narrow: `tests/themes.check.js` validates only basic key order/types and not richer schema or link/image integrity

## Working Agreement For Future Sessions

- Read this file before making assumptions about project state
- Update this file manually when there are relevant decisions, branch changes, automation updates, or persistent blockers
- Keep entries concise and durable; avoid transient noise
- Future agents should create a commit and push after implementing relevant changes or new functionality so work stays traceable and reversible
- Future agents must not merge without explicit user authorization
- Future agents must not take actions that could affect the production main branch without explicit user authorization
