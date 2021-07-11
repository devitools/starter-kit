<?php

declare(strict_types=1);

namespace App\Domains\Admin;

use Devitools\Agnostic\Schema;
use Devitools\Auth\Login;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class Notification
 *
 * @package App\Domains\Admin
 */
class Notification extends Schema
{
    /**
     * The resource associated with the schema.
     *
     * @return string
     */
    public static function resource(): string
    {
        return 'notifications';
    }

    /**
     * @return string
     */
    public function domain(): string
    {
        return 'admin/notification';
    }

    /**
     * Build the schema fields and actions.
     *
     * @return void
     */
    public function construct(): void
    {
        #----- fields

        $this->addField('userId')
            ->isSelectRemote(User::class, 'user');

        $this->addField('subject')
            ->validationRequired();

        $this->addField('message')
            ->isText()
            ->validationRequired();

        $this->addField('read')
            ->isBoolean()
            ->defaultValue(false);

        $this->addField('readAt')
            ->isDatetime()
            ->castAs('datetime');

        #----- hooks

        $this->addHook('query:default', function (Builder $query) {
            /** @var Login $user */
            $user = $this->getUser();
            $userId = $user->getAttributeValue(__PRIMARY_KEY__);
            return $query->where('userId', $userId);
        });
    }
}
