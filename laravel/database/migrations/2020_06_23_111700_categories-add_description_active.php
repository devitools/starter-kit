<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableAlter;
use Devitools\Database\Table;

/**
 * Class CategoriesAddDescriptionActive
 */
class CategoriesAddDescriptionActive extends TableAlter
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
     *
     * @return void
     */
    protected function onUp(Table $table)
    {
        $table->text('description')->nullable();
        $table->boolean('active')->default(false)->nullable();
    }

    /**
     * @param Table $table
     *
     * @return void
     */
    protected function onDown(Table $table)
    {
        $table->dropColumn('description');
        $table->dropColumn('active');
    }
}
