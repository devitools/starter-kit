<?php

declare(strict_types=1);

use Devitools\Http\Routing\Router;
use Source\Http\Controllers\Admin\ProfileController;
use Source\Http\Controllers\Admin\UserController;

Router::restricted()->group(static function () {
    Router::api('/admin/user', UserController::class);
    Router::api('/admin/profile', ProfileController::class);
});
