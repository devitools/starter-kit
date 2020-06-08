<?php

declare(strict_types=1);

namespace Source\Domains\Admin\User;

use Illuminate\Support\Facades\Hash;
use Source\Domains\Admin\User;

use function PhpBrasil\Collection\Helper\prop;

/**
 * Class UserBefore
 * @package Source\Domains\Admin\User
 */
class UserBefore
{
    /**
     * UserBefore constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->configurePassword($user);
    }

    /**
     * @param User $user
     */
    private function configurePassword(User $user): void
    {
        $password = $user->getValue('password');
        if (!$password) {
            return;
        }

        $info = Hash::info($password);
        if (prop($info, 'algoName') !== 'unknown') {
            return;
        }
        $user->setValue('password', Hash::make($password));
    }
}
