<?php

declare(strict_types=1);

namespace App\Domains\Admin;

use Devitools\Agnostic\Schema;

/**
 * Class Permission
 *
 * @property string namespace
 * @package App\Domains\Admin
 */
class Permission extends Schema
{
    /**
     * @return string
     */
    public function domain(): string
    {
        return 'admin/permission';
    }

    /**
     * The resource associated with the schema.
     *
     * @return string
     */
    public static function resource(): string
    {
        return 'permissions';
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

        $this->addField('namespace')
            ->validationRequired();
    }
}
