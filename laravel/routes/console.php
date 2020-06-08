<?php

declare(strict_types=1);

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Php\File;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan
    ::command('inspire', function () {
        $this->comment(Inspiring::quote());
    })
    ->describe('Display an inspiring quote');

Artisan
    ::command('env', function () {
        $filename = __DIR__ . '/../.env';
        if (File::exists($filename)) {
            $this->comment('A file ".env" already exists.');
            return;
        }
        $content = '' .
            '# app constants' . PHP_EOL .
            'APP_KEY=' . PHP_EOL .
            '' . PHP_EOL .
            '# JWT and Sentry settings' . PHP_EOL .
            'JWT_SECRET=' . PHP_EOL;
        File::write($filename, $content);
        $this->comment('The new file ".env" is created.');
    })
    ->describe('Create a simple .env file');
