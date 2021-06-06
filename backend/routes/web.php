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
use Illuminate\Http\Request;
use Php\File;

$pwa = static function (Request $request) {
    if (preg_match('/http[s]?:\/\/(ws|api)\.(.*)/', $request->url())) {
        return view('welcome');
    }

    $index = __DIR__ . '/../public/index.html';
    if (!File::exists($index)) {
        return view('welcome');
    }
    return file_get_contents($index);
};

Router::get('/', $pwa);

Router::group(['prefix' => '/statics'], __DIR__ . '/web/statics.php');
Router::group(['prefix' => '/report'], __DIR__ . '/web/report.php');

if (env('APP_DEBUG') === true) {
    Router::get('/info', static function () {
        /** @noinspection ForgottenDebugOutputInspection */
        echo phpinfo();
    });
}

Router::any('{any}', $pwa)->where('any', '.*');
