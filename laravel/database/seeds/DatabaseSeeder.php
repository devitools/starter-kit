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
                    // admin.profile
                    'admin.profile.action',
                    'admin.profile.add',
                    'admin.profile.destroy',
                    'admin.profile.edit',
                    'admin.profile.index',
                    'admin.profile.trash',
                    'admin.profile.view',
                    // admin.user
                    'admin.user.action',
                    'admin.user.add',
                    'admin.user.destroy',
                    'admin.user.edit',
                    'admin.user.index',
                    'admin.user.trash',
                    'admin.user.view',
                ]
            ]
        );

        $playerProfileId = ProfileRepository::instance()->create(
            [
                'id' => '1082340c-9b6e-11ea-992c-0242ac160005',
                'name' => 'REGULAR',
                'reference' => Profile::REFERENCE_REGULAR,
                'permissions' => [
                ]
            ]
        );
        # </PROFILES>

        # <USERS>
        UserRepository::instance()->create(
            [
                'profileId' => Uuid::fromString($adminProfileId)->getBytes(),
                'name' => 'ADMIN',
                'username' => 'root@devi.tools',
                'password' => 'aq1sw2de3',
            ]
        );

        UserRepository::instance()->create(
            [
                'profileId' => Uuid::fromString($playerProfileId)->getBytes(),
                'name' => 'REGULAR',
                'username' => 'regular@devi.tools',
                'password' => 'aq1sw2de3',
            ]
        );
        # </# <USERS>USERS>
    }
}
