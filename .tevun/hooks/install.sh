#!/usr/bin/env bash

echo " ~> [hooks\install.sh] on [${1}, ${2}]"

cd "${1}" || exit

docker exec hellix-nginx bash -c "su -c \"composer install --no-interaction\" application"
docker exec hellix-nginx bash -c "su -c \"php artisan migrate --force\" application"

docker exec hellix-node bash -c "su -c \"wget http://localhost/version/check\" application"
