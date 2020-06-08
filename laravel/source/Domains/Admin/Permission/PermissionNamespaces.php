<?php

declare(strict_types=1);

namespace Source\Domains\Admin\Permission;

/**
 * Class PermissionNamespaces
 *
 * @package Source\Domains\Admin\Permission
 */
abstract class PermissionNamespaces
{
    /**
     * @var string
     */
    public const ADMIN_PROFILE_ACTION = 'admin.profile.action';

    /**
     * @var string
     */
    public const ADMIN_PROFILE_ADD = 'admin.profile.add';

    /**
     * @var string
     */
    public const ADMIN_PROFILE_DESTROY = 'admin.profile.destroy';

    /**
     * @var string
     */
    public const ADMIN_PROFILE_EDIT = 'admin.profile.edit';

    /**
     * @var string
     */
    public const ADMIN_PROFILE_INDEX = 'admin.profile.index';

    /**
     * @var string
     */
    public const ADMIN_PROFILE_TRASH = 'admin.profile.trash';

    /**
     * @var string
     */
    public const ADMIN_PROFILE_VIEW = 'admin.profile.view';

    /**
     * @var string
     */
    public const ADMIN_USER_ACTION = 'admin.user.action';

    /**
     * @var string
     */
    public const ADMIN_USER_ADD = 'admin.user.add';

    /**
     * @var string
     */
    public const ADMIN_USER_DESTROY = 'admin.user.destroy';

    /**
     * @var string
     */
    public const ADMIN_USER_EDIT = 'admin.user.edit';

    /**
     * @var string
     */
    public const ADMIN_USER_INDEX = 'admin.user.index';

    /**
     * @var string
     */
    public const ADMIN_USER_TRASH = 'admin.user.trash';

    /**
     * @var string
     */
    public const ADMIN_USER_VIEW = 'admin.user.view';

    /**
     * @var string
     */
    public const GENERAL_CATEGORY_ACTION = 'general.category.action';

    /**
     * @var string
     */
    public const GENERAL_CATEGORY_ADD = 'general.category.add';

    /**
     * @var string
     */
    public const GENERAL_CATEGORY_DESTROY = 'general.category.destroy';

    /**
     * @var string
     */
    public const GENERAL_CATEGORY_EDIT = 'general.category.edit';

    /**
     * @var string
     */
    public const GENERAL_CATEGORY_INDEX = 'general.category.index';

    /**
     * @var string
     */
    public const GENERAL_CATEGORY_TRASH = 'general.category.trash';

    /**
     * @var string
     */
    public const GENERAL_CATEGORY_VIEW = 'general.category.view';

    /**
     * @param string $namespace
     *
     * @return mixed
     */
    public static function dependencies(string $namespace): array
    {
        $dependencies = [
            static::ADMIN_PROFILE_ACTION => [
                static::ADMIN_PROFILE_INDEX,
            ],
            static::ADMIN_USER_ACTION => [
                static::ADMIN_USER_INDEX,
                static::ADMIN_PROFILE_INDEX,
            ],
            static::GENERAL_CATEGORY_ACTION => [
                static::GENERAL_CATEGORY_INDEX,
            ],
        ];
        return $dependencies[$namespace] ?? [];
    }
}
