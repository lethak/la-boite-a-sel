#!/bin/sh

trap : TERM INT

echo "whoami: $USER";
echo "id: $(id)";
cd /workspace

# Ah, ha, ha, ha, stayin' alive...
tail -f /dev/null & wait
