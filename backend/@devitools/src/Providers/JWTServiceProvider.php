<?php

declare(strict_types=1);

namespace Devitools\Providers;

use Illuminate\Foundation\Application;
use Tymon\JWTAuth\Http\Parser\AuthHeaders;
use Tymon\JWTAuth\Http\Parser\Cookies;
use Tymon\JWTAuth\Http\Parser\InputSource;
use Tymon\JWTAuth\Http\Parser\Parser;
use Tymon\JWTAuth\Http\Parser\QueryString;
use Tymon\JWTAuth\Http\Parser\RouteParams;
use Tymon\JWTAuth\Providers\LaravelServiceProvider;

/**
 * Class JWTServiceProvider
 *
 * @package Devitools\Providers
 */
class JWTServiceProvider extends LaravelServiceProvider
{
    /**
     * Register the bindings for the Token Parser.
     *
     * @return void
     */
    protected function registerTokenParser()
    {
        $this->app->singleton('tymon.jwt.parser', function (Application $app) {
            $parser = new Parser(
                $app['request'],
                [
                    (new AuthHeaders)->setHeaderName($this->config('token_key_name')),
                    (new QueryString)->setKey($this->config('token_key_query_string')),
                    (new InputSource)->setKey($this->config('token_key_name')),
                    (new RouteParams)->setKey($this->config('token_key_name')),
                    (new Cookies($this->config('decrypt_cookies')))->setKey($this->config('token_key_name')),
                ]
            );

            $app->refresh('request', $parser, 'setRequest');

            return $parser;
        });
    }
}
