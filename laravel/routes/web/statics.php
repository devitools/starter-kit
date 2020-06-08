<?php

declare(strict_types=1);

use Devitools\Http\Controllers\File\Download;
use Devitools\Http\Controllers\File\Upload;
use Devitools\Http\Routing\Router;

Router::get('/{any}', Download::class)->where('any', '.*');
Router::post('/{any}', Upload::class)->where('any', '.*');
