<?php

declare(strict_types=1);

namespace Source\Domains\Admin;

use Devitools\Exceptions\ErrorUserForbidden;
use Devitools\Persistence\AbstractModel;
use Devitools\Units\Common\UserSession;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Source\Domains\Admin\User\UserCreated;
use Source\Domains\Admin\User\UserCreating;
use Source\Domains\Admin\User\UserUpdating;

/**
 * Class User
 *
 * @property User agent
 * @property mixed uuid
 * @property string name
 * @property string username
 * @property string firstName
 * @property string lastName
 * @property string birthday
 * @property string gender
 * @property string email
 * @property string phone
 * @property string password
 * @property string remember_token
 * @property bool active
 * @property string activation_link
 * @package Source\Domains\Admin
 */
class User extends AbstractModel
{
    /**
     * @trait
     */
    use UserSession;

    /**
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'profileId',
        'username',
        'name',
        'password',
        'active',
    ];

    /**
     * @var array
     */
    protected $rules = [
        'profileId' => [
            'required',
            'string',
            'exists:profiles,uuid'
        ],
        'username' => [
            'required',
            'min:2',
            'max:255',
            'email',
            // 'regex:/(^([a-zA-Z]+)([_]+)?(\d+)?([a-zA-Z]+)?)$/u'
        ],
        'name' => [
            'required',
            'max:255',
        ],
        'password' => [
            'sometimes',
            'required',
            'max:255',
            'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[#$^+=!*()@%&]?).{6,}$/',
        ],
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'uuid',
        'password',
        'remember_token',
    ];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'creating' => UserCreating::class,
        'created' => UserCreated::class,
        'updating' => UserUpdating::class,
    ];

    /**
     * @var array
     */
    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * @var array
     */
    protected array $uniques = [
        'username',
    ];

    /**
     * Get the primary key for the model.
     *
     * @return string
     */
    public function getAuthIdentifier(): string
    {
        return 'id';
    }

    /**
     * @return array
     */
    public function manyToOne(): array
    {
        return ['profile' => 'profileId'];
    }

    /**
     * @return BelongsTo
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'profileId', 'uuid');
    }

    /**
     * @return string
     */
    public function domain(): string
    {
        return 'admin.user';
    }

    /**
     * @param bool $excludeDeleted
     *
     * @return Builder
     * @noinspection ReturnTypeCanBeDeclaredInspection
     */
    public function newQuery($excludeDeleted = true)
    {
        /** @noinspection PhpMethodParametersCountMismatchInspection */
        $query = parent::newQuery($excludeDeleted);

        try {
            $user = $this->getUser();
        } catch (ErrorUserForbidden $exception) {
            return $query;
        }

        if ($user->getReference() === Profile::REFERENCE_ADMIN) {
            return $query;
        }

        return $query->where('uuid', '=', $user->uuid);
    }
}
