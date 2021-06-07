<?php

declare(strict_types=1);

use App\Domains\Admin\Permission;
use App\Domains\Admin\Profile;
use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class PermissionsCreate
 */
class PermissionsCreate extends TableCreate
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return Permission::resource();
    }

    /**
     * @param Table $table
     *
     * @return void
     */
    protected function withStatements(Table $table): void
    {
        $table->efficientUuid(config('devitools.auth.profileId', 'profileId'));

        $table->string('namespace');

        $table->foreign(config('devitools.auth.profileId', 'profileId'), 'permissions_profileId')
            ->references(__BINARY_KEY__)
            ->on(Profile::resource())
            ->onDelete('cascade');
    }
}
