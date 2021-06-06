<?php

declare(strict_types=1);

namespace Devitools\Providers;

use Devitools\Auth\Login;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Throwable;

/**
 * Class AppServiceProvider
 *
 * @package Devitools\Providers
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     * @noinspection ReturnTypeCanBeDeclaredInspection
     */
    public function boot()
    {
        Blade::if('allow', function ($value) {
            try {
                $user = Auth::user();
                /** @var Login $user */
                /** @noinspection NullPointerExceptionInspection */
                $reference = $user->profile->getReference();
                return $reference === $value;
            } catch (Throwable $exception) {
                return false;
            }
        });

        Blade::if('deny', function ($value) {
            try {
                $user = Auth::user();
                /** @var Login $user */
                /** @noinspection NullPointerExceptionInspection */
                $reference = $user->profile->getReference();
                return $reference !== $value;
            } catch (Throwable $exception) {
                return false;
            }
        });

        if ($this->app->environment() !== 'production') {
            return;
        }
        /** @noinspection OffsetOperationsInspection */
        $this->app['request']->server->set('HTTPS', true);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
