#!/bin/sh
set -eu

cd "$(dirname "$0")"

case "${1:-}" in
  serve)
    exec npm run start
    ;;
  deploy)
    exec npm run deploy
    ;;
  *)
    echo "Usage: ./manage.sh {serve|deploy}" >&2
    exit 2
    ;;
esac
