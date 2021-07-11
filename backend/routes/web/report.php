<?php

declare(strict_types=1);

use Devitools\Http\Controllers\Report\ReportLoading;
use Devitools\Http\Controllers\Report\ReportProcess;
use Devitools\Http\Routing\Router;

Router::get('/loading', ReportLoading::class);
Router::post('/process/{report}', ReportProcess::class)->middleware(['jwt.auth']);