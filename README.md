# LaravelReactContactBook
Contact Book application based on Laravel plus React

You can use it with LAMP stack or with Docker, instruction for docker:

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

# Usage
React: register new user or use existing one.
Laravel:
If you don't have any users:
- http://contact-book.local/api/register - send POST request
with body like:
  {
      "name": "Test Jonh Doe",
      "email": "test@example.com",
      "password": "123123^Qa",
      "password_confirmation": "123123^Qa"
  }

- After registration send POST request here with credentials that was used for register
  http://contact-book.local/api/login
{
    "name": "Test Jonh Doe",
    "email": "test@example.com"
}

Copy "token" from response.

List of USER endpoints:
POST            api/login  AuthController@login
POST            api/logout  AuthController@logout
POST            api/register  AuthController@register
GET|HEAD        api/user  AuthController@user

Now you can access to API and get all contacts (for example)
GET http://contact-book.local/api/contacts

List of contact book endpoints:

GET|HEAD        api/contacts › ContactsController@index
POST            api/contacts › ContactsController@store
GET|HEAD        api/contacts/{contact} › ContactsController@show
PUT|PATCH       api/contacts/{contact} › ContactsController@update
DELETE          api/contacts/{contact} › ContactsController@destroy
