#!/usr/bin/make

# choco install make

.DEFAULT_GOAL := help

help:  ## Display this help
	@echo "Help"

##@ Docker actions

up: ## Start containers detached
	docker-compose up -d

down: ## Stop all containers
	docker-compose down

logs: ## Show the output logs
	docker-compose logs

log: ## Open the logs and follow the news
	docker-compose logs --follow

##@ Bash shortcuts

nginx: ## Enter bash nginx container
	docker-compose exec laravel-adapter bash

##@ Composer

install: ## Composer install dependencies
	docker-compose exec laravel-adapter bash -c "su -c \"composer install\" application"

autoload: ## Run the composer dump
	docker-compose exec laravel-adapter bash -c "su -c \"composer dump-autoload\" application"

##@ Scripts

test: ## Perform command test
	docker-compose exec laravel-adapter bash -c "su -c \"composer run test\" application"

test-unit: ## Perform command test-unit
	docker-compose exec laravel-adapter bash -c "su -c \"composer run test-unit\" application"

test-integration: ## Perform command test-integration
	docker-compose exec laravel-adapter bash -c "su -c \"composer run test-integration\" application"

test-filter: ## Perform command test-filter
	docker-compose exec laravel-adapter bash -c "su -c \"composer run test-filter\" application"

coverage: ## Perform command coverage
	docker-compose exec laravel-adapter bash -c "su -c \"composer run coverage\" application"

coverage-ci: ## Perform command coverage-ci
	docker-compose exec laravel-adapter bash -c "su -c \"composer run coverage-ci\" application"

phpcs: ## Perform command phpcs
	docker-compose exec laravel-adapter bash -c "su -c \"composer run phpcs\" application"

phpcs-fixer: ## Perform command phpcs-fixer
	docker-compose exec laravel-adapter bash -c "su -c \"composer run phpcs-fixer\" application"

phpcbf: ## Perform command phpcbf
	docker-compose exec laravel-adapter bash -c "su -c \"composer run phpcbf\" application"
