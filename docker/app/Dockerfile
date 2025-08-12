FROM php:8.2-fpm

# Instala dependências do sistema e extensões PHP
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev zip libpng-dev libonig-dev libxml2-dev curl libcurl4-openssl-dev libxslt-dev ca-certificates \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copia o composer do container oficial
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copia apenas os arquivos de dependência para aproveitar cache do Docker
COPY composer.json composer.lock ./

# Executa o composer install aqui na build para cache
RUN composer install --ignore-platform-reqs --no-interaction --prefer-dist --optimize-autoloader

# Agora copia todo o código da aplicação
COPY . .

# Copia e configura o entrypoint
COPY docker/app/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
