#!/usr/bin/make

# choco install make

.DEFAULT_GOAL := help

help:  ## Display this help
	@echo "Help"

##@ Initialize work

init: ## Start a new develop environment
	cp .env.example .env

##@ Dev actions

dev: ## Start containers detached
	yarn dev

##@ Composer

install: ## Composer install dependencies
	yarn install
