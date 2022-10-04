#!/usr/bin/env bash

set -e

DEFAULT_ENV="dev"
DEFAULT_CMD="up"

for arg in "$@"
do
    if [ "$arg" == "--help" ] || [ "$arg" == "-h" ]
    then
        echo "Usage: stack <env> [...]"
        echo "Exemple: stack dev up"
        exit 0
    fi
done

ENV=${1:-$DEFAULT_ENV}
FOLLOWUP_ARGS=${@: 2:${#@}}
FOLLOWUP_ARGS=${FOLLOWUP_ARGS:-$DEFAULT_CMD}

###########################

docker-compose --env-file=".env.docker" -f "services/compose_base.yml" \
    -f "services/node/cli/17x/_compose_base.yml" \
    -f "services/node/cli/17x/compose_$ENV.yml" \
    $FOLLOWUP_ARGS
