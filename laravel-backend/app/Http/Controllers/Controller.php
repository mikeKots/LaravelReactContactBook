<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="Contact Book API",
 *     version="1.0.0",
 *     description="A simple Contact Book API built with Laravel",
 *     @OA\Contact(
 *         email="admin@contactbook.com"
 *     )
 * )
 *
 * @OA\Server(
 *     url="http://localhost",
 *     description="Local development server"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Enter token in format (Bearer <token>)"
 * )
 */
abstract class Controller
{
    //
}
