# LaravelReactContactBook
Contact Book application based on Laravel plus React

# Instruction

# 1. Start Docker Desktop
# 2. Clone / setup your project
# 3. Build and start containers
# 4. Execute this commands
docker-compose build
docker-compose up -d
docker-compose exec app composer install
docker-compose exec app php artisan migrate
docker-compose exec app php artisan key:generate


# Final result:
http://localhost:8080	React Frontend
http://localhost:8080/api	Laravel API