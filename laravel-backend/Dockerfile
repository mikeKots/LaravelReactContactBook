FROM php:8.4-fpm

RUN apt-get update && apt-get install -y libpng-dev libonig-dev libxml2-dev zip unzip git curl

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www/html

WORKDIR /var/www/html

RUN composer install --no-dev --optimize-autoloader

RUN php artisan key:generate
#RUN php artisan migrate --force

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

CMD ["php-fpm"]
