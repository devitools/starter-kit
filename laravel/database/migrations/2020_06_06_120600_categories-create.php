<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class CategoriesCreate
 */
class CategoriesCreate extends TableCreate
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return 'categories';
    }

    /**
     * @param Table $table
     */
    protected function withStatements(Table $table): void
    {
        $table->string('name');
    }
}
