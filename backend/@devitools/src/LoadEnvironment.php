<?php

declare(strict_types=1);

namespace Devitools;

use Dotenv\Dotenv;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables;
use Illuminate\Support\Env;
use Php\File;
use Throwable;

/**
 * Class LoadEnvironment
 *
 * @package Devitools\Http
 */
class LoadEnvironment extends LoadEnvironmentVariables
{
    /**
     * Create a Dotenv instance.
     *
     * @param  Application  $app
     * @return mixed
     */
    protected function createDotenv($app)
    {
        $names = ['.env.defaults', $app->environmentFile()];
        try {
            $filename = __DIR__ . '/../.env.' . $app->environment();
            if (File::exists($filename)) {
                $names[] = '.env.' . $app->environment();
            }
        } catch (Throwable $exception) {
            // silent is gold
        }

        return Dotenv::create(
            Env::getRepository(),
            $app->environmentPath(),
            $names,
            false
        );
    }
}
