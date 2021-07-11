<?php

declare(strict_types=1);

namespace Devitools\Providers;

use Aws\S3\S3Client;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use League\Flysystem\AwsS3v3\AwsS3Adapter;
use League\Flysystem\Filesystem;

/**
 * Class MinioStorageServiceProvider
 *
 * @requires coraxster/flysystem-aws-s3-v3-minio
 * Use composer require coraxster/flysystem-aws-s3-v3-minio
 * @package Devitools\Providers
 */
class MinioStorageServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Storage::extend('minio', static function ($app, $config) {
            $client = new S3Client([
                'credentials' => [
                    'key' => $config["key"],
                    'secret' => $config["secret"]
                ],
                'region' => $config["region"],
                'version' => "latest",
                'bucket_endpoint' => false,
                'use_path_style_endpoint' => true,
                'endpoint' => $config["endpoint"],
            ]);
            $options = [
                'override_visibility_on_copy' => true
            ];
            return new Filesystem(new AwsS3Adapter($client, $config["bucket"], '', $options));
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
    }
}
