<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class TypesCreate
 */
class TypesCreate extends TableCreate
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return 'types';
    }

    /**
     * @param Table $table
     */
    protected function withStatements(Table $table): void
    {
        $table->string('name');
    }
}
