#!/bin/sh

DEFAULT_SCRIPT_PATH="unknown.js"
SCRIPT_PATH="./${1-$DEFAULT_SCRIPT_PATH}"

cd /workspace

echo "whoami: $(whoami)";
echo "pwd: $(pwd)";
echo "node $SCRIPT_PATH";
#sh /wait-for.sh http://xxx:15672 -- /usr/local/bin/node  "$SCRIPT_PATH";
sh /usr/local/bin/node  "$SCRIPT_PATH";
