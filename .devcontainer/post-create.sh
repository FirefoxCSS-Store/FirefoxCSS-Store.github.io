#!/usr/bin/env bash
set -euo pipefail

if ! command -v jq >/dev/null 2>&1; then
	sudo apt-get update
	sudo apt-get install -y jq
fi

python3 -m venv .venv
.venv/bin/python -m pip install --upgrade pip uv

export PATH="$PWD/.venv/bin:$HOME/.local/bin:$PATH"
if ! command -v bm >/dev/null 2>&1; then
	uv tool install basic-memory
fi

npm ci
