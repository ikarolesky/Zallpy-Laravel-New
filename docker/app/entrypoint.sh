#!/bin/sh

# Espera o banco de dados (MySQL) estar pronto
echo "Waiting for MySQL..."

while ! nc -z db 3306; do
  sleep 1
done

echo "MySQL started"

# Se não existir, copia .env
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Gera a APP_KEY (não gera novamente se já existir)
php artisan key:generate || true

# Roda as migrations forçadamente
php artisan migrate --force

# Cria link simbólico do storage
php artisan storage:link

# Limpa cache config (opcional)
php artisan config:cache

# Executa o comando passado para o container (php-fpm)
exec "$@"
