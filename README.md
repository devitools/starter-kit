# Devitools "Laravel-Quasar" Starter Kit

## Get Started

### Start backend

Open the terminal on `laravel` dir and run the command below
```
docker-compose up -d
```

Install dependencies
```
docker exec -it devitools-nginx bash -c "su -c 'composer install' application"
```

Generate key
```
docker exec -it devitools-nginx bash -c "su -c 'php artisan env' application"
docker exec -it devitools-nginx bash -c "su -c 'php artisan key:generate' application"
docker exec -it devitools-nginx bash -c "su -c 'php artisan jwt:secret' application"
```

Migrate the database
```
docker exec -it devitools-nginx bash -c "su -c 'php artisan migrate:fresh' application"
```

Stop the backend
```
docker-compose down
```

### Start frontend

Open the terminal on `quasar` dir and run the command below
```
yarn
```

After install all dependencies, use the command below to start dev mode
```
yarn dev
```
