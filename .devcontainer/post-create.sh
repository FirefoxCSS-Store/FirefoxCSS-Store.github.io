#!/usr/bin/env bash
set -euo pipefail

if ! command -v jq >/dev/null 2>&1; then
	sudo apt-get update
	sudo apt-get install -y jq
fi

npm ci
