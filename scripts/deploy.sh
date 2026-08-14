#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -d _site ]]; then
  echo "No _site directory. Run npm run build first." >&2
  exit 1
fi

ORIGIN="$(git remote get-url origin)"
NAME="$(git config user.name)"
EMAIL="$(git config user.email)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cp -a _site/. "$TMP/"
cd "$TMP"
git init -b master
git add -A
git -c user.name="$NAME" -c user.email="$EMAIL" -c commit.gpgsign=false commit -m "Deploy site"
git remote add origin "$ORIGIN"
git push --force origin master
