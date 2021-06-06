<?php

declare(strict_types=1);

namespace App\Domains\Admin;

use App\Domains\Admin\User\UserEventSaving;
use Devitools\Agnostic\Schema;

/**
 * Class User
 *
 * @package App\Domains\Admin
 */
class User extends Schema
{
    /**
     * @return string
     */
    public function domain(): string
    {
        return 'admin/user';
    }

    /**
     * The resource associated with the schema.
     *
     * @return string
     */
    public static function resource(): string
    {
        return 'users';
    }

    /**
     * Build the schema fields and actions.
     *
     * @return void
     */
    public function construct(): void
    {
        $this->addField('profileId')
            ->isSelectRemote(Profile::class, 'profile')
            ->validationRequired();

        $this->addField('name')
            ->validationRequired();

        $this->addField('email')
            ->validationRequired();

        $this->addField('password')
            ->hidden();

        $this->addField('active')
            ->isBoolean();

        $this->addField('phone');

        $this->addField('birthdate');

        $this->addField('phone');

        $this->addEvent('saving', UserEventSaving::class);
    }
}
