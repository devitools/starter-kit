#!/usr/bin/make

# choco install make

.DEFAULT_GOAL := help

help:  ## Display this help
	@echo "Help"

##@ Initialize work

init: ## Start a new develop environment
	docker-compose up -d
	docker-compose exec devitools-nginx bash -c "cp .env.example .env && cp docker-compose.yml.example docker-compose.yml"
	docker-compose exec devitools-nginx bash -c "su -c 'composer install' application"
	docker-compose exec devitools-nginx bash -c "su -c 'php artisan migrate:fresh' application"

##@ Docker actions

dev: ## Start containers detached
	docker-compose up -d

logs: ## Show the output logs
	docker-compose logs

log: ## Open the logs and follow the news
	docker-compose logs --follow

restart: ## Restart the app container
	docker-compose restart devitools-nginx

##@ Database tools

migration: ## Create migration file
	docker-compose exec devitools-nginx bash -c "su -c \"php artisan make:migration $(name)\" application"

migrate: ## Perform migrations
	docker-compose exec devitools-nginx php artisan migrate

migrate.fresh: ## Perform migrations
	docker-compose exec devitools-nginx php artisan migrate:fresh

rollback: ## Rollback migration
	docker-compose exec devitools-nginx php artisan migrate:rollback

backup: ## Export database
	docker-compose exec devitools-mysql bash -c "mysqldump -u root -p database > /var/www/app/backup.sql"
	docker-compose exec devitools-mysql bash -c "chown 1000:1000 /var/www/app/backup.sql"

restore: ## Import database
	docker-compose exec devitools-mysql bash -c "mysqldump -u root -p database > /var/www/app/backup.sql"

##@ Composer

install: ## Composer install dependencies
	docker-compose exec devitools-nginx bash -c "su -c \"composer install\" application"

autoload: ## Run the composer dump
	docker-compose exec devitools-nginx bash -c "su -c \"composer dump-autoload\" application"
