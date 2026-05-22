---
title: Development Container Environment
type: guide
tags:
- firefoxcss-store
- devcontainer
- environment
permalink: firefoxcss-store/projects/firefoxcss-store/operations/development-container-environment
---

# Development Container Environment

Local containerized development is configured through `.devcontainer/devcontainer.json` and `.devcontainer/post-create.sh`. The devcontainer installs Node, npm, GitHub CLI, and `jq`; Nushell is no longer required for catalog refresh.

The devcontainer bootstrap script runs from `postCreateCommand` to install project dependencies after container creation or rebuild. It also runs `npm ci` automatically, so rebuilds recreate `node_modules` without manual setup.

The devcontainer installs GitHub CLI through the `ghcr.io/devcontainers/features/github-cli:1` feature. The `gh` CLI still requires `gh auth login` or `GH_TOKEN` for GitHub API and Actions commands.

The devcontainer mounts `/tmp` as a `tmpfs` with mode `1777` through `runArgs` so VS Code Dev Containers can start under rootless Podman. Without this, the generated feature image can leave `/tmp` at `755` and fail when creating `/tmp/.X11-unix`.

## Observations
- [config] Devcontainer config is `.devcontainer/devcontainer.json` #devcontainer
- [bootstrap] Devcontainer bootstrap script is `.devcontainer/post-create.sh` #devcontainer
- [automation] `postCreateCommand` runs `.devcontainer/post-create.sh` after container creation or rebuild #devcontainer
- [dependency_install] The devcontainer runs `npm ci` automatically #npm
- [tooling] The devcontainer installs Node, npm, `gh`, and `jq` #tooling
- [tooling_change] Nushell is no longer required for catalog refresh #tooling
- [github_cli] GitHub CLI is installed via `ghcr.io/devcontainers/features/github-cli:1` #gh
- [auth_requirement] `gh` requires `gh auth login` or `GH_TOKEN` for GitHub API and Actions commands #auth
- [podman_fix] `/tmp` is mounted as `tmpfs` with mode `1777` for rootless Podman compatibility #podman

## Relations
- supports [[Tooling and Validation]]
- supports [[GitHub Actions Automation]]
- governed_by [[Project Working Agreement]]