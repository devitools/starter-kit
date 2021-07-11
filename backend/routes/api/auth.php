<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\Change;
use App\Http\Controllers\Auth\Me;
use App\Http\Controllers\Auth\Recover;
use App\Http\Controllers\Auth\Refresh;
use App\Http\Controllers\Auth\SignIn;
use App\Http\Controllers\Auth\Update;
use Devitools\Http\Routing\Router;

Router::post('/auth/sign-in', SignIn::class);
Router::post('/auth/recover', Recover::class);
Router::post('/auth/change', Change::class);

Router::restricted()->group(static function () {
    Router::get('/auth/me', Me::class);
    Router::post('/auth/refresh', Refresh::class);

    Router::patch('/auth/update', Update::class);
    Router::post('/auth/update', Update::class);
});
