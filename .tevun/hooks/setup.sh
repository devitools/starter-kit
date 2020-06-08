#!/usr/bin/env bash

echo " ~> [hooks\setup.sh] on [${1}, ${2}]"

cd "${1}" || exit

docker exec -it devitools-nginx bash -c "su -c 'php artisan env' application"
docker exec -it devitools-nginx bash -c "su -c 'php artisan key:generate' application"
docker exec -it devitools-nginx bash -c "su -c 'php artisan jwt:secret' application"
docker exec -it devitools-nginx bash -c "su -c 'php artisan migrate:fresh' application"
