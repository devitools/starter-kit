#!/usr/bin/make

# choco install make

.DEFAULT_GOAL := help

help:  ## Display this help
	@echo "Help"

##@ Initialize work

init: ## Start a new develop environment
	cp .env.example .env
	cp docker-compose.yml.example docker-compose.yml

	docker-compose up -d

	@sleep 10

	docker-compose exec hellix-mysql bash -c "mysql -u root -p database < /var/www/app/database/dump/FUNCTION.sql"
	docker-compose exec hellix-mysql bash -c "mysql -u root -p database < /var/www/app/database/dump/TABLE.sql"
	docker-compose exec hellix-mysql bash -c "mysql -u root -p database < /var/www/app/database/dump/VIEW.sql"
	docker-compose exec hellix-mysql bash -c "mysql -u root -p database < /var/www/app/database/dump/DATA.sql"

	docker-compose exec hellix-nginx bash -c "su -c 'composer install' application"

	docker-compose exec hellix-nginx bash -c "su -c 'php artisan migrate' application"

##@ Docker actions

dev: ## Start containers detached
	docker-compose up -d

logs: ## Show the output logs
	docker-compose logs

log: ## Open the logs and follow the news
	docker-compose logs --follow

restart: ## Restart the app container
	docker-compose restart hellix-nginx

##@ Database tools

migration: ## Create migration file
	docker-compose exec hellix-nginx bash -c "su -c \"php artisan make:migration $(name)\" application"

migrate: ## Perform migrations
	docker-compose exec hellix-nginx php artisan migrate

fresh: ## Perform a fresh migrations
	docker-compose exec hellix-nginx php artisan migrate:fresh

rollback: ## Rollback migration
	docker-compose exec hellix-nginx php artisan migrate:rollback

backup: ## Export database
	docker-compose exec hellix-mysql bash -c "mysqldump -u root -p database > /var/www/app/backup.sql"
	docker-compose exec hellix-mysql bash -c "chown 1000:1000 /var/www/app/backup.sql"

restore: ## Import database
	docker-compose exec hellix-mysql bash -c "mysql -u root -p database < /var/www/app/database/backup.sql"

##@ Composer

install: ## Composer install dependencies
	docker-compose exec hellix-nginx bash -c "su -c \"composer install\" application"

autoload: ## Run the composer dump
	docker-compose exec hellix-nginx bash -c "su -c \"composer dump-autoload\" application"
