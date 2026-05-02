# FirefoxCSS-Store

FirefoxCSS-Store is a static community catalog for discovering and sharing Firefox `userChrome.css` themes. It does not scrape, crawl, or auto-discover themes. Every public entry points back to the original repository submitted by an author, maintainer, or community user.

## What This Project Publishes

- A searchable theme gallery built with Astro and TypeScript.
- One public detail page per published theme.
- A generated `/themes.json` endpoint for lightweight integrations.
- A GitHub Issue Form that collects theme submissions and opens candidate PRs through automation.
- Validation scripts that keep catalog entries structured, reviewable, and safe to publish.

## Local Development

```sh
npm ci
npm test
npm run build
npm run dev
```

## Theme Data

Theme entries live in `src/content/themes/*.json`. New submissions should start with:

- `status: "candidate"`
- `submitterRole: "author"`, `"user"`, or `"maintainer"`
- the original `repository` URL
- at least one screenshot in `public/assets/img/themes/`
- normalized lowercase tags

Only entries with `status: "published"` are rendered in the public catalog and exported through `/themes.json`.

Entries with `status: "archived"` are rendered in `/archive/` and remain available for historical discovery, but the UI marks them as unsupported. Archived entries must include `retirement` metadata with a reason, check date, and reviewer-facing details.

## Theme Submissions

Community submissions use the `Submit a theme` GitHub Issue Form. When a complete issue is opened or edited, `.github/workflows/create-theme-submission.yml` runs `scripts/create-theme-submission-from-issue.mjs` to:

- create a candidate JSON entry in `src/content/themes/`;
- download attached or linked screenshots into `public/assets/img/themes/`;
- populate basic repository metadata such as stars, last update date, and owner avatar;
- validate the catalog with `npm test` and `npm run build`;
- open or update a review pull request from a `submissions/theme-<issue-number>` branch.

The generated entry remains `status: "candidate"` until a maintainer approves the submission PR. Approval runs `.github/workflows/publish-approved-theme-submission.yml`, which switches the entry to `status: "published"` and assigns the next available `catalogIndex`. Maintainers still merge the PR explicitly after checks pass. Merged submission PRs close their source issue automatically.

## Metadata Refresh

`npm run refresh:themes` updates only basic repository metadata for repositories already present in the catalog:

- stars
- last update date
- owner avatar
- accessibility status

It does not search for new themes, crawl topics, or change editorial fields such as title, description, tags, screenshots, or publication status.

The monthly `Refresh Theme Stats` workflow runs the same refresh command and opens a review PR when stars, update dates, avatars, or accessibility values change.

## Repository Audit

`npm run audit:theme-repos` checks the repositories already listed in the catalog. It does not discover new repositories.

The monthly GitHub Actions workflow runs this audit and opens a review PR when it finds changes:

- repositories that still exist but are archived are moved to `status: "archived"` and shown in `/archive/`;
- repositories that return deleted, unavailable, or gone are removed from the catalog in the PR;
- repositories that cannot be checked due to transient API errors are listed in the PR report for manual follow-up.

## Deployment

GitHub Actions validates PRs with:

```sh
npm test
npm run build
```

The production workflow builds Astro into `dist/` and deploys that artifact to GitHub Pages. Generated site files are not committed back to the repository.

## Deployment Target

This branch is configured to run from the original organization GitHub Pages domain:

- `astro.config.mjs`
  - `site: "https://firefoxcss-store.github.io"`
  - no `base`, because the site is served from the domain root
- `src/layouts/BaseLayout.astro`
  - GitHub navigation link points to `https://github.com/FirefoxCSS-Store/FirefoxCSS-Store.github.io`
- `src/pages/submit.astro`
  - submission issue link points to `https://github.com/FirefoxCSS-Store/FirefoxCSS-Store.github.io`
