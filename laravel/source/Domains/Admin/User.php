<?php

declare(strict_types=1);

namespace Source\Domains\Admin;

use Devitools\Agnostic\Schema;
use Devitools\Exceptions\ErrorUserForbidden;
use Illuminate\Database\Eloquent\Builder;
use Source\Domains\Admin\User\UserCreated;
use Source\Domains\Admin\User\UserCreating;
use Source\Domains\Admin\User\UserUpdating;

/**
 * Class User
 *
 * @package Source\Domains\Admin
 */
class User extends Schema
{
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
     * @return string
     */
    public function domain(): string
    {
        return 'admin.user';
    }

    /**
     * Build the schema fields and actions.
     *
     * @return void
     */
    public function construct(): void
    {
        $this->addField('profileId')
            ->isSelectRemote( Profile::class, 'profile')
            ->validationRequired();

        $this->addField('username')
            ->unique()
            ->validationRequired()
            ->validationString()
            ->validationMin(2)
            ->validationMax(255)
            // 'regex:/(^([a-zA-Z]+)([_]+)?(\d+)?([a-zA-Z]+)?)$/u'
            ->validationEmail();

        $this->addField('name')
            ->validationMax(255)
            ->validationRequired();

        $this->addField('password')
            ->hidden()
            ->validationSometimes()
            ->validationRequired()
            ->validationMax(255)
            ->validationRegex('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[#$^+=!*()@%&]?).{6,}$/');

        $this->addField('active')
            ->isBoolean();

        $this->addField('uuid')
            ->hidden(true);

        $this->addField('remember_token')
            ->hidden(true);

        $this->addEvent('creating', UserCreating::class);
        $this->addEvent('created', UserCreated::class);
        $this->addEvent('updating', UserUpdating::class);

        $this->addHook('fetch:record', function (Builder $query) {
            try {
                $user = $this->getUser();
            } catch (ErrorUserForbidden $exception) {
                return $query;
            }

            if ($user->getReference() === Profile::REFERENCE_ADMIN) {
                return $query;
            }

            return $query->where('uuid', '=', $user->uuid);
        });
    }
}
