<?php

declare(strict_types=1);

use Devitools\Http\Routing\Router;
use Source\Http\Controllers\General\CategoryController;
use Source\Http\Controllers\General\ProductController;

Router::restricted()->group(static function () {
    Router::api('/general/category', CategoryController::class);
    Router::api('/general/product', ProductController::class);
});
