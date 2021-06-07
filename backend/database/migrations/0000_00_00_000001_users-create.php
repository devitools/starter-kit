<?php

declare(strict_types=1);

use App\Domains\Admin\Profile;
use App\Domains\Admin\User;
use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class UsersCreate
 */
class UsersCreate extends TableCreate
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return User::resource();
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

        $table->efficientUuid(config('devitools.auth.profileId', 'profileId'))->nullable();
        $table->foreign(config('devitools.auth.profileId', 'profileId'), 'users_proFileId')
            ->references(__BINARY_KEY__)
            ->on(Profile::resource())
            ->onDelete('restrict');
    }
}
