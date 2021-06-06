<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class PasswordResetsCreate
 */
class PasswordResetsCreate extends TableCreate
{
    /**
     * @var bool
     */
    protected bool $modifiable = false;

    /**
     * @return string
     */
    protected function table(): string
    {
        return 'password_resets';
    }

    /**
     * @param Table $table
     *
     * @return void
     */
    protected function withStatements(Table $table): void
    {
        $table->string('email')->index();
        $table->string('token');
    }
}
