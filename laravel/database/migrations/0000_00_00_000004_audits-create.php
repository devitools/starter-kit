<?php

declare(strict_types=1);

use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class AuditsCreate
 */
class AuditsCreate extends TableCreate
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
        return 'audits';
    }

    /**
     * @param Table $table
     *
     * @return void
     */
    protected function withStatements(Table $table): void
    {
        $table->increments('id');
        $table->string('user_type')->nullable();
        $table->efficientUuid('user_id')->nullable();
        $table->string('event');
        // $table->morphs('auditable');
        $table->string('auditable_type')->nullable();
        $table->string('auditable_id')->nullable();

        $table->text('old_values')->nullable();
        $table->text('new_values')->nullable();
        $table->text('url')->nullable();
        $table->ipAddress('ip_address')->nullable();
        $table->string('user_agent')->nullable();
        $table->string('tags')->nullable();
        $table->timestamps();

        $table->index(['user_id', 'user_type']);
    }
}
