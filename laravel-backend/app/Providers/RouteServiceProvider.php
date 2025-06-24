<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            // API Routes
            Route::prefix('api')
                ->middleware('api')
                ->group(base_path('routes/api.php'));

            // Swagger Documentation Routes
            Route::prefix('api/documentation')
                ->middleware('api') // Add 'auth:sanctum' here for production
                ->group(function () {
                    Route::get('/', '\L5Swagger\Http\Controllers\SwaggerController@api')->name('l5-swagger.default.api');
                    Route::get('/asset/{asset}', '\L5Swagger\Http\Controllers\SwaggerAssetController@index')->name('l5-swagger.default.asset');
                    Route::get('/docs', '\L5Swagger\Http\Controllers\SwaggerController@docs')->name('l5-swagger.default.docs');
                });

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
