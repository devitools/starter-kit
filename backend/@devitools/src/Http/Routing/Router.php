<?php

declare(strict_types=1);

namespace Devitools\Http\Routing;

use Illuminate\Routing\RouteRegistrar;
use Illuminate\Support\Facades\Route as Facade;

/**
 * Class Router
 *
 * @package Devitools\Http\Routing
 */
class Router extends Facade
{
    /**
     * @param string $uri
     * @param string $controller
     *
     * @deprecated use provide instead resource
     */
    public static function api(string $uri, string $controller): void
    {
        static::provide($uri, $controller);
    }

    /**
     * @param string $uri
     * @param string $controller
     */
    public static function provide(string $uri, string $controller): void
    {
        $actions = [
            # search
            // static::get($uri, "{$controller}@search");
            ['verb' => 'get', 'path' => $uri, 'method' => 'search'],

            # create
            // static::post($uri, "{$controller}@create");
            ['verb' => 'post', 'path' => $uri, 'method' => 'create'],

            # read
            // static::get("{$uri}/{id}", "{$controller}@read");
            ['verb' => 'get', 'path' => "{$uri}/{id}", 'method' => 'read'],

            # update
            // static::patch("{$uri}/{id}", "{$controller}@update");
            ['verb' => 'patch', 'path' => "{$uri}/{id}", 'method' => 'update'],
            // static::post("{$uri}/{id}", "{$controller}@update");
            ['verb' => 'post', 'path' => "{$uri}/{id}", 'method' => 'update'],

            # destroy
            // static::delete("{$uri}/{id}", "{$controller}@destroy");
            ['verb' => 'delete', 'path' => "{$uri}/{id}", 'method' => 'destroy'],

            # restore
            // static::put("{$uri}/{id}/restore", "{$controller}@restore");
            ['verb' => 'put', 'path' => "{$uri}/{id}/restore", 'method' => 'restore'],

            # erase
            // static::delete("{$uri}/{id}/erase", "{$controller}@erase");
            ['verb' => 'delete', 'path' => "{$uri}/{id}/erase", 'method' => 'erase'],

            # download
            // static::get("{$uri}/download/{format}", "{$controller}@download");
            ['verb' => 'get', 'path' => "{$uri}/download/{format}", 'method' => 'download'],
        ];

        foreach ($actions as $action) {
            $verb = $action['verb'];
            $path = $action['path'];
            $method = $action['method'];
            if (!method_exists($controller, $method)) {
                continue;
            }
            static::$verb($path, "{$controller}@{$method}");
        }
    }

    /**
     * @return RouteRegistrar
     */
    public static function restricted(): RouteRegistrar
    {
        return static::middleware(config('app.restricted'));
    }
}
