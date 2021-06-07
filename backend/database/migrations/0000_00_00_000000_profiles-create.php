<?php

declare(strict_types=1);

use App\Domains\Admin\Profile;
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
        return Profile::resource();
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

