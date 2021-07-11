<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class ProfilesCreate
 */
class ProfilesCreate extends TableCreate
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return 'profiles';
    }

    /**
     * @param Table $table
     *
     * @return void
     */
    protected function withStatements(Table $table): void
    {
        $table->string('name');
        $table->string('reference');
    }
}

