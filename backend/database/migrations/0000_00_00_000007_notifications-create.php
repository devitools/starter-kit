<?php

declare(strict_types=1);

use App\Domains\Admin\Notification;
use App\Domains\Admin\User;
use Devitools\Database\Migration\TableCreate;
use Devitools\Database\Table;

/**
 * Class NotificationsCreate
 */
class NotificationsCreate extends TableCreate
{
    /**
     * @return string
     */
    protected function table(): string
    {
        return Notification::resource();
    }

    /**
     * @param Table $table
     *
     * @return void
     */
    protected function withStatements(Table $table): void
    {
        $table->efficientUuid('userId');

        $table->string('subject');
        $table->text('message');
        $table->boolean('read');
        $table->dateTime('readAt');

        $table->foreign('userId', 'notifications_userId')
            ->references(__BINARY_KEY__)
            ->on(User::resource())
            ->onDelete('cascade');
    }
}
