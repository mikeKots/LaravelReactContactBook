<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function() {
    return response()->json(['message' => 'Redirect to frontend login']);
})->name('login');
