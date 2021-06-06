<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    /**
     * Block Cypher
     */
    'blockcypher' => [
        'base_url' => env('BLOCKCYPHER_BASE_URL', null),
        'callback' => env('BLOCKCYPHER_CALLBACK', null),
        'token' => env('BLOCKCYPHER_TOKEN', null),
        'btc_network' => env('BLOCKCYPHER_BTC_NETWORK', null),
    ],

    /**
     * Kraken
     */
    'kraken' => [
        'base_url' => env('KRAKEN_BASE_URL', null),
        'key' => env('KRAKEN_KEY', null),
        'secret' => env('KRAKEN_KEY_SECRET', null),
        'minimum' => env('KRAKEN_KEY_MINIMUM_VOLUME', 200000),
    ],

    /**
     * Fixer
     */
    'fixer' => [
        'base_url' => env('FIXER_BASE_URL', null),
        'key' => env('FIXER_KEY', null),
    ],

    /**
     * Magna
     */
    'magna' => [
        'analytics' => [
            'url' => env('MAGNA_ANALYTICS_URL', 'https://metrics.andy.vip/analytics.js'),
            'affiliateId' => env('MAGNA_ANALYTICS_AFFILIATE', '4fh459sb25pg'),
            'shopId' => env('MAGNA_ANALYTICS_AFFILIATE', '4fi416mrub8k'),
        ],
    ],

];
