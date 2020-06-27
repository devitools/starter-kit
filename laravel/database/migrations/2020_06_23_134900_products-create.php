<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class ProductsCreate
 */
class ProductsCreate extends TableCreate
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return 'products';
    }

    /**
     * @param Table $table
     */
    protected function withStatements(Table $table): void
    {
        $table->string('name');
    }
}
