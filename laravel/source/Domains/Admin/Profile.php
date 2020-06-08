<?php

declare(strict_types=1);

namespace Source\Domains\Admin;

use Devitools\Auth\ProfileInterface;
use Devitools\Persistence\AbstractModel as Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Source\Domains\Admin\Permission\ProfileSaving;

use function is_array;

/**
 * Class Profile
 *
 * @package Source\Domains\Admin
 * @property string reference
 * @property Collection permissions
 * @property string uuid
 */
class Profile extends Model implements ProfileInterface
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
     * @var string
     */
    public const REFERENCE_AGENT = 'agent';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'profiles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'reference',
    ];

    /**
     * @var array
     */
    protected $rules = [
        'name' => ['required'],
        'reference' => ['required', 'in:admin,regular,agent'],
    ];

    protected $dispatchesEvents = [
        'saving' => ProfileSaving::class,
    ];

    /**
     * @return array
     */
    public function oneToMany(): array
    {
        return [
            'permissions' => static function ($data) {
                if (is_array($data)) {
                    return ['namespace' => $data['namespace'] ?? null];
                }
                return ['namespace' => $data];
            },
        ];
    }

    /**
     * @return HasMany
     */
    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class, 'profileId', $this->primaryKey);
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
}
