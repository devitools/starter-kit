<?php

declare(strict_types=1);

namespace App\Domains\Admin\Profile;

use App\Domains\Admin\Permission\PermissionNamespaces;
use App\Domains\Admin\Profile;

use function count;
use function is_string;
use function Php\prop;
use function PhpBrasil\Collection\pack;

/**
 * Class ProfileEventSaving
 *
 * @package Source\Domains\Admin\Permission
 */
class ProfileEventSaving
{
    /**
     * ProfileEventSaving constructor.
     *
     * @param Profile $profile
     */
    public function __construct(Profile $profile)
    {
        $this->configurePermissions($profile);
    }

    /**
     * @param Profile $profile
     */
    private function configurePermissions(Profile $profile): void
    {
        $permissions = $profile->getFilled('permissions');
        if (!is_iterable($permissions)) {
            return;
        }
        $map = [];
        foreach ($permissions as $permission) {
            $namespace = $permission;
            if (!is_string($permission)) {
                $namespace = prop($permission, 'namespace');
            }

            $map[$namespace] = true;
            $dependencies = PermissionNamespaces::dependencies($namespace);
            if (!count($dependencies)) {
                continue;
            }
            foreach ($dependencies as $dependency) {
                $map[$dependency] = true;
            }
        }
        $value = pack($map)->keys();
        $profile->setFilled('permissions', $value);
    }
}
