<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class UsersCreateTable
 */
class UsersCreateTable extends TableCreate
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return 'users';
    }

    /**
     * @param Table $table
     *
     * @return void
     */
    protected function withStatements(Table $table): void
    {
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password')->nullable();
        $table->boolean('active')->default(0);
        $table->rememberToken();

        $table->string('phone')->nullable();
        $table->string('birthdate')->nullable();
        $table->string('photo')->nullable();

        $table->efficientUuid('profileId')->nullable();
        $table->foreign('profileId', 'usersProFileId')
            ->references('uuid')
            ->on('profiles')
            ->onDelete('restrict');
    }
}
