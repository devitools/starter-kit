<?php

declare(strict_types=1);

namespace Devitools\Units\Common;

use Devitools\Exceptions\ErrorUserForbidden;
use Illuminate\Contracts\Auth\Authenticatable;

/**
 * Trait UserSession
 *
 * @package Devitools\Units\Common
 */
trait UserSession
{
    /**
     * @return Authenticatable
     * @throws ErrorUserForbidden
     */
    protected function getUser(): Authenticatable
    {
        $user = auth()->user();
        if (!$user) {
            throw new ErrorUserForbidden(['user' => 'forbidden']);
        }
        return $user;
    }
}
