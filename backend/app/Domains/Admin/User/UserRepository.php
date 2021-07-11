<?php

declare(strict_types=1);

namespace App\Domains\Admin\User;

use Devitools\Persistence\AbstractRepository as Repository;
use App\Domains\Admin\User;

/**
 * Class UserRepository
 *
 * @package App\Domains\Admin\User
 */
class UserRepository extends Repository
{
    /**
     * @var string
     */
    protected string $prototype = User::class;
}
