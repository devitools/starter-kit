<?php

declare(strict_types=1);

namespace Source\Domains\Admin;

use Devitools\Agnostic\Schema;
use Devitools\Auth\ProfileInterface;
use Illuminate\Database\Eloquent\Collection;
use Source\Domains\Admin\Permission\ProfileSaving;

/**
 * Class Profile
 *
 * @property mixed reference
 * @property mixed permissions
 * @package Source\Domains\Admin
 */
class Profile extends Schema implements ProfileInterface
{
    /**
     * @var string
     */
    public const REFERENCE_ADMIN = 'admin';

    /**
     * @var string
     */
    public const REFERENCE_REGULAR = 'regular';

    /**
     * The resource associated with the schema.
     *
     * @return string
     */
    public static function resource(): string
    {
        return 'profiles';
    }

    /**
     * @return string
     */
    public function domain(): string
    {
        return 'admin.profile';
    }

    /**
     * @return string
     */
    public function getReference(): string
    {
        return $this->reference;
    }

    /**
     * @return Collection
     */
    public function getPermissions(): Collection
    {
        return $this->permissions;
    }


    /**
     * Build the schema fields and actions.
     *
     * @return void
     */
    public function construct(): void
    {
        $this->addField('name')
            ->validationString()
            ->validationMax(255)
            ->validationRequired();

        $this->addField('reference')
            ->validationIn(['admin', 'regular'])
            ->validationRequired();

        $this->addField('permissions')
            ->isTree(Permission::class, 'profileId',  static function ($data) {
                if (is_array($data)) {
                    return ['namespace' => $data['namespace'] ?? null];
                }
                return ['namespace' => $data];
            })
            ->validationRequired();

        $this->addEvent('saving', ProfileSaving::class);
    }
}
