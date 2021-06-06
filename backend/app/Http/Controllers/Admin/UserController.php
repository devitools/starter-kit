<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use Devitools\Http\Controllers\AbstractRestController as Controller;
use App\Domains\Admin\User\UserRepository;

/**
 * Class UserController
 *
 * @package App\Http\Controllers\Admin
 */
class UserController extends Controller
{
    /**
     * User constructor.
     *
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        parent::__construct($repository);
    }
}
