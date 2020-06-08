<?php

declare(strict_types=1);

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
        return 'permissions';
    }

    /**
     * @param Table $table
     *
     * @return void
     */
    protected function withStatements(Table $table): void
    {
        $table->efficientUuid('profileId');

        $table->string('namespace');

        $table->foreign('profileId', 'permissions_profileId')
            ->references('uuid')
            ->on('profiles')
            ->onDelete('cascade');
    }
}
