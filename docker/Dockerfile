FROM php:8.2-fpm

# Instalar dependências
RUN apt-get update && apt-get install -y \
    git zip unzip curl libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Criar diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos do Laravel
COPY . .

# Instalar dependências PHP
RUN composer install --no-dev --optimize-autoloader

# Rodar comandos Artisan no build
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan migrate --force

CMD ["php-fpm"]
