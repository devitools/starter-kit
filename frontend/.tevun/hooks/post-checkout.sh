#!/usr/bin/env bash

echo " ~> [hooks\post-checkout.sh] on [${1}, ${2}]"

cd "${1}" || exit

docker-compose up -d
