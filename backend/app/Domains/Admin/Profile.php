<?php

declare(strict_types=1);

namespace App\Domains\Admin;

use App\Domains\Admin\Profile\ProfileEventSaving;
use Devitools\Agnostic\Schema;
use Devitools\Auth\ProfileInterface;

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
        return 'admin/profile';
    }

    /**
     * @return string
     */
    public function getReference(): string
    {
        return $this->reference;
    }

    /**
     * @return array
     */
    public function getPermissions(): array
    {
        return $this->permissions->map(fn($row) => $row['namespace'])->toArray();
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
            ->validationRequired();

        $this->addField('permissions')
            ->isTree(Permission::class, 'profileId', static function ($data) {
                if (is_array($data)) {
                    return ['namespace' => $data['namespace'] ?? null];
                }
                return ['namespace' => $data];
            });

        $this->addEvent('saving', ProfileEventSaving::class);
    }
}
