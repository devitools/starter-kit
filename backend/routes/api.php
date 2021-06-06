<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Devitools\Http\Response\Answer;
use Devitools\Http\Routing\Router;

Router::prefix('v1')->group(static function () {
    Router::group([], __DIR__ . '/api/auth.php');
    Router::group([], __DIR__ . '/api/admin.php');
});

Router::get('/statics/version', fn() => file_get_contents(__DIR__ . '/../public/statics/version'));

Router::any('{any}', static function ($any) {
    return Answer::error("Route not found: {$any}", 404);
})->where('any', '.*');
