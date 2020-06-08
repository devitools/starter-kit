<?php

declare(strict_types=1);

use Devitools\Units\Common\Instance;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use Source\Domains\Admin\Permission\PermissionNamespaces;
use Source\Domains\Admin\Profile;
use Source\Domains\Admin\Profile\ProfileRepository;
use Source\Domains\Admin\User\UserRepository;

/**
 * Class DatabaseSeeder
 */
class DatabaseSeeder extends Seeder
{
    /**
     */
    use Instance;

    /**
     * Seed the application's database.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        # <CLEAR>
        DB::table('users')->delete();
        DB::table('profiles')->delete();
        DB::table('permissions')->delete();
        # </CLEAR>

        # <PROFILES>
        $adminProfileId = ProfileRepository::instance()->create(
            [
                'id' => '1074db2c-9b6e-11ea-b508-0242ac160005',
                'name' => 'ADMIN',
                'reference' => Profile::REFERENCE_ADMIN,
                'permissions' => [
                    PermissionNamespaces::ADMIN_PROFILE_ACTION,
                    PermissionNamespaces::ADMIN_PROFILE_ADD,
                    PermissionNamespaces::ADMIN_PROFILE_DESTROY,
                    PermissionNamespaces::ADMIN_PROFILE_EDIT,
                    PermissionNamespaces::ADMIN_PROFILE_INDEX,
                    PermissionNamespaces::ADMIN_PROFILE_TRASH,
                    PermissionNamespaces::ADMIN_PROFILE_VIEW,

                    PermissionNamespaces::ADMIN_USER_ACTION,
                    PermissionNamespaces::ADMIN_USER_ADD,
                    PermissionNamespaces::ADMIN_USER_DESTROY,
                    PermissionNamespaces::ADMIN_USER_EDIT,
                    PermissionNamespaces::ADMIN_USER_INDEX,
                    PermissionNamespaces::ADMIN_USER_TRASH,
                    PermissionNamespaces::ADMIN_USER_VIEW,

                    PermissionNamespaces::GENERAL_CATEGORY_ACTION,
                    PermissionNamespaces::GENERAL_CATEGORY_ADD,
                    PermissionNamespaces::GENERAL_CATEGORY_DESTROY,
                    PermissionNamespaces::GENERAL_CATEGORY_EDIT,
                    PermissionNamespaces::GENERAL_CATEGORY_INDEX,
                    PermissionNamespaces::GENERAL_CATEGORY_TRASH,
                    PermissionNamespaces::GENERAL_CATEGORY_VIEW,
                ]
            ]
        );

        $playerProfileId = ProfileRepository::instance()->create(
            [
                'id' => '1082340c-9b6e-11ea-992c-0242ac160005',
                'name' => 'REGULAR',
                'reference' => Profile::REFERENCE_REGULAR,
                'permissions' => [
                    PermissionNamespaces::GENERAL_CATEGORY_ACTION,
                    PermissionNamespaces::GENERAL_CATEGORY_ADD,
                    PermissionNamespaces::GENERAL_CATEGORY_DESTROY,
                    PermissionNamespaces::GENERAL_CATEGORY_EDIT,
                    PermissionNamespaces::GENERAL_CATEGORY_INDEX,
                    PermissionNamespaces::GENERAL_CATEGORY_TRASH,
                    PermissionNamespaces::GENERAL_CATEGORY_VIEW,
                ]
            ]
        );
        # </PROFILES>

        # <USERS>
        UserRepository::instance()->create(
            [
                'profileId' => Uuid::fromString($adminProfileId)->getBytes(),
                'name' => 'ADMIN',
                'username' => 'root',
                'password' => 'aq1sw2de3',
            ]
        );

        UserRepository::instance()->create(
            [
                'profileId' => Uuid::fromString($playerProfileId)->getBytes(),
                'name' => 'REGULAR',
                'username' => 'user',
                'password' => 'aq1sw2de3',
            ]
        );
        # </# <USERS>USERS>
    }
}
