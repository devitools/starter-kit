<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Domains\Admin\Profile;
use App\Domains\Admin\Profile\ProfileRepository;
use App\Domains\Admin\User\UserRepository;
use Devitools\Units\Common\Instance;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

/**
 * Class BootstrapSeeder
 */
class BootstrapSeeder extends Seeder
{
    /**
     */
    use Instance;

    /**
     * @throws Exception
     */
    public function run(): void
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
                'name' => 'Admin',
                'reference' => Profile::REFERENCE_ADMIN,
                'permissions' => [
                    // admin.profile
                    'admin/profile.action',
                    'admin/profile.index',
                    'admin/profile.add',
                    'admin/profile.view',
                    'admin/profile.edit',
                    'admin/profile.destroy',
                    'admin/profile.trash',
                    // admin/user
                    'admin/user.action',
                    'admin/user.index',
                    'admin/user.add',
                    'admin/user.view',
                    'admin/user.edit',
                    'admin/user.destroy',
                    'admin/user.trash',
                    // admin/notification
                    'admin/notification.action',
                    'admin/notification.index',
                    'admin/notification.view',
                ]
            ]
        );
        # </PROFILES>

        # <USERS>
        UserRepository::instance()->create(
            [
                config('devitools.auth.profileId', 'profileId') => Uuid::fromString($adminProfileId)->getBytes(),
                'name' => 'Admin',
                'email' => env('APP_DEV_USERNAME', 'root@devi.tools'),
                'password' => env('APP_DEV_PASSWORD', 'aq1sw2de3'),
                'active' => true,
            ]
        );
        # </USERS>

        Storage::disk('minio')
            ->put('/admin/user/no-photo', File::get(__DIR__ . '/../../public/images/no-photo.png'));
    }
}
