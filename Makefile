SHELL := /bin/bash

up:
	docker-compose up -d --build

down:
	docker-compose down

restart: down up

logs:
	docker-compose logs -f --tail=150

bash:
	docker-compose exec app bash

composer-install:
	docker-compose exec app composer install

migrate:
	docker-compose exec app php artisan migrate

seed:
	docker-compose exec app php artisan db:seed

key-generate:
	docker-compose exec app php artisan key:generate

vite-dev:
	docker-compose run --rm -p 5173:5173 node npm run dev

vite-build:
	docker-compose run --rm node npm run build

serve:
	docker-compose exec app php artisan serve --host=0.0.0.0 --port=8000
