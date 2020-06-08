<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Devitools\Http\Routing\Router;
use Illuminate\Http\Response;

Router::match(['GET', 'POST', 'OPTIONS'], '/', static function () {
    return file_get_contents(__DIR__ . '/../public/index.html');
});

Router::group(['prefix' => '/statics'], __DIR__ . '/web/statics.php');
Router::group(['prefix' => '/report'], __DIR__ . '/web/report.php');

if (env('APP_DEV')) {
    Router::get('/info', static function () {
        /** @noinspection ForgottenDebugOutputInspection */
        echo phpinfo();
    });
}


Router::any('{any}', static function ($any) {
    return Response::create("URL requested: '{$any}'", 404);
})->where('any', '.*');
