<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class MarkersCreate
 */
class MarkersCreate extends TableCreate
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return 'markers';
    }

    /**
     * @param Table $table
     */
    protected function withStatements(Table $table): void
    {
        $table->string('name');
    }
}
