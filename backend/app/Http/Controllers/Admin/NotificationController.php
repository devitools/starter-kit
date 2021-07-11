<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Domains\Admin\Notification\NotificationRepository;
use Devitools\Http\Controllers\AbstractRestController;

/**
 * Class NotificationController
 *
 * @package App\Http\Controllers\Admin
 */
class NotificationController extends AbstractRestController
{
    /**
     * NotificationController constructor.
     *
     * @param NotificationRepository $repository
     */
    public function __construct(NotificationRepository $repository)
    {
        parent::__construct($repository);
    }
}
