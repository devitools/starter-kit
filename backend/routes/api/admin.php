<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\Notification\MarkAsReadNotificationController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\UserController;
use Devitools\Http\Routing\Router;

Router::restricted()->group(static function () {
    Router::provide('/admin/user', UserController::class);
    Router::provide('/admin/profile', ProfileController::class);
    Router::patch('/admin/notification/{id}/mark-as-read', MarkAsReadNotificationController::class);
    Router::provide('/admin/notification', NotificationController::class);
});
