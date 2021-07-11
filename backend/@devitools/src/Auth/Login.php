<?php

declare(strict_types=1);

namespace Devitools\Auth;

use Dyrynda\Database\Support\GeneratesUuid as HasBinaryUuid;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Throwable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 *
 * @package Source\Domains\Admin
 * @property string uuid
 * @property string id
 * @property string name
 * @property string password
 * @property boolean active
 * @property ProfileInterface profile
 * @method static Login where(string $column, mixed $value)
 * @method static Login whereRaw(string $column, mixed $value)
 * @method Login firstOrFail()
 * @method Login first()
 * @method Login withTrashed()
 */
class Login extends User implements JWTSubject, Authenticator
{
    /**
     * @see Notifiable
     */
    use Notifiable;

    /**
     * @see HasBinaryUuid
     */
    use HasBinaryUuid;
    use SoftDeletes;

    /**
     * @var string
     */
    public const DELETED_AT = __DELETED_AT__;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The "type" of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        __BINARY_KEY__ => 'string',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'profileId',
        __PRIMARY_KEY__,
        __BINARY_KEY__,
        'password',
        'remember_token',
    ];

    /**
     * @return BelongsTo
     */
    public function profile(): BelongsTo
    {
        $related = config('auth.providers.users.profile');
        $foreignKey = config('devitools.auth.profileId', 'profileId');
        return $this->belongsTo($related, $foreignKey, __BINARY_KEY__);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get the primary key for the model.
     *
     * @return string
     */
    public function getKeyName()
    {
        return __PRIMARY_KEY__;
    }

    /**
     * @return string
     */
    public function getReference(): string
    {
        try {
            return $this->profile->getReference();
        } catch (Throwable $error) {
            // silent is gold
        }
        return 'unknown';
    }

    /**
     * @return string[]
     */
    public function getPermissions(): array
    {
        try {
            return $this->profile->getPermissions();
        } catch (Throwable $error) {
            // silent is gold
        }
        return [];
    }

    /**
     * Get an attribute from the model.
     *
     * @param string $name
     *
     * @return mixed
     */
    public function getValue(string $name)
    {
        return $this->getAttribute($name);
    }
}
