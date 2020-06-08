<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class FailedJobsCreate
 */
class FailedJobsCreate extends TableCreate
{
    /**
     * @var bool
     */
    protected bool $withUuid = false;

    /**
     * @var bool
     */
    protected bool $withTimestamps = false;

    /**
     * @var bool
     */
    protected bool $withResponsible = false;

    /**
     * @return string
     */
    protected function table(): string
    {
        return 'failed_jobs';
    }

    /**
     * @param Table $table
     *
     * @return void
     */
    protected function withStatements(Table $table): void
    {
        $table->bigIncrements('id');
        $table->text('connection');
        $table->text('queue');
        $table->longText('payload');
        $table->longText('exception');
        $table->timestamp('failed_at')->useCurrent();
    }
}
