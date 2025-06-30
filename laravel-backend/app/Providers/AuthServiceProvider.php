<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Contacts;
use App\Policies\ContactPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     */
    protected $policies = [
        Contacts::class => ContactPolicy::class,
    ];

    /**
     * Register any authentication
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
