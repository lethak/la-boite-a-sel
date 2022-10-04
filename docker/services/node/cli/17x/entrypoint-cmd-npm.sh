#!/bin/sh

DEFAULT_NPM_CMD="unknown"
NPM_CMD="${1-$DEFAULT_NPM_CMD}"

cd /workspace

echo "whoami: $(whoami)";
echo "pwd: $(pwd)";
echo "npm run $SCRIPT_PATH";
npm run "$NPM_CMD";
