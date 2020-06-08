<?php

declare(strict_types=1);

use Devitools\Http\Routing\Router;
use Source\Http\Controllers\Auth\Me;
use Source\Http\Controllers\Auth\Refresh;
use Source\Http\Controllers\Auth\Register;
use Source\Http\Controllers\Auth\SignIn;

Router::post('/auth/register', Register::class);
Router::post('/auth/sign-in', SignIn::class);
Router::post('/auth/refresh', Refresh::class);

Router::restricted()->group(static function () {
    Router::get('/auth/me', Me::class);
});
