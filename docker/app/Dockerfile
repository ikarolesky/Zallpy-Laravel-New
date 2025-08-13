FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git unzip libzip-dev zip libpng-dev libonig-dev libxml2-dev curl libcurl4-openssl-dev libxslt-dev ca-certificates netcat \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Cache composer
COPY composer.json composer.lock /var/www/html/
RUN composer install --ignore-platform-reqs --no-interaction --prefer-dist --optimize-autoloader

# Copia código
COPY . .

# Entrypoint para rodar artesans ao subir
COPY docker/app/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
