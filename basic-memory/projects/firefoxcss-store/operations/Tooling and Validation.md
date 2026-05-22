---
title: Tooling and Validation
type: guide
tags:
- firefoxcss-store
- tooling
- validation
permalink: firefoxcss-store/projects/firefoxcss-store/operations/tooling-and-validation
---

# Tooling and Validation

The project uses npm with Astro, TypeScript, and Node 24. The default validation command for catalog checks is `npm test`, which runs the theme validation script. When source files under the site or generated asset pipeline change, agents should also run `npm run build`.

The theme validation script is `scripts/validate-themes.mjs`. Repository metadata refresh and audit scripts are documented separately in [[Repository Stats and Audit Automation]]. The npm audit state is currently clean after adding a targeted `yaml` override for the Astro check toolchain.

## Observations
- [package_manager] The project uses `npm` #tooling
- [runtime] The build toolchain runs on Node 24 with Astro 6 #node
- [build_command] Use `npm run build` for site/source changes #build
- [test_command] Use `npm test` for theme JSON validation checks #test
- [validation_script] Theme validation is implemented in `scripts/validate-themes.mjs` #validation
- [audit_status] `npm audit` is clean after a targeted `yaml` override for the Astro check toolchain #security
- [validation_policy] Pull requests touching catalog or site files should run `npm test` and `npm run build` #ci

## Relations
- validates [[Theme Catalog Source of Truth]]
- validates [[Astro Site Architecture]]
- supports [[Project Working Agreement]]
- pairs_with [[GitHub Actions Automation]]