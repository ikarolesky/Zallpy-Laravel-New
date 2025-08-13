#!/bin/sh
set -e

echo "Aguardando MySQL em db:3306..."
until nc -z db 3306; do
  sleep 1
done
echo "MySQL disponível."

if [ ! -f .env ]; then
  cp .env.example .env
fi

php artisan key:generate || true

php artisan migrate --force
php artisan storage:link || true
php artisan config:cache

exec "$@"
