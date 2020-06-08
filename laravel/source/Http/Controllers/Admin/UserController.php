<?php

declare(strict_types=1);

namespace Source\Http\Controllers\Admin;

use Devitools\Http\Controllers\AbstractRestController;
use Source\Domains\Admin\User\UserRepository;

/**
 * Class UserController
 *
 * @package Source\Http\Controllers\Admin
 */
class UserController extends AbstractRestController
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
