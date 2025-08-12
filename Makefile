# Nome dos containers (ajuste se mudar no docker-compose.yml)
PHP_CONTAINER=laravel-php
NODE_CONTAINER=laravel-node

# Gera e sobe os containers
up:
	docker-compose up -d --build

# Derruba os containers
down:
	docker-compose down

# Instala dependências PHP
composer-install:
	docker-compose exec $(PHP_CONTAINER) composer install

# Instala dependências JS
npm-install:
	docker-compose exec $(NODE_CONTAINER) npm install

# Gera key Laravel
key-generate:
	docker-compose exec $(PHP_CONTAINER) php artisan key:generate

# Roda migrations
migrate:
	docker-compose exec $(PHP_CONTAINER) php artisan migrate

# Roda seeds
seed:
	docker-compose exec $(PHP_CONTAINER) php artisan db:seed

# Rodar servidor Laravel
serve:
	docker-compose exec $(PHP_CONTAINER) php artisan serve --host=0.0.0.0 --port=8000

# Rodar Vite em modo dev
vite-dev:
	docker-compose exec $(NODE_CONTAINER) npm run dev

# Rodar Vite build para produção
vite-build:
	docker-compose exec $(NODE_CONTAINER) npm run build

# Limpar cache Laravel
cache-clear:
	docker-compose exec $(PHP_CONTAINER) php artisan cache:clear
	docker-compose exec $(PHP_CONTAINER) php artisan config:clear
	docker-compose exec $(PHP_CONTAINER) php artisan route:clear
	docker-compose exec $(PHP_CONTAINER) php artisan view:clear
