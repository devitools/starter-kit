<?php

declare(strict_types=1);

use Devitools\Http\Routing\Router;
use Source\Http\Controllers\General\CategoryController;
use Source\Http\Controllers\General\MarkerController;
use Source\Http\Controllers\General\TypeController;

Router::restricted()->group(static function () {
    Router::api('/general/category', CategoryController::class);
    Router::api('/general/marker', MarkerController::class);
    Router::api('/general/type', TypeController::class);
});
