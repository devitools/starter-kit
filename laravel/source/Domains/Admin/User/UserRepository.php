<?php

declare(strict_types=1);

namespace Source\Domains\Admin\User;

use Devitools\Persistence\AbstractRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Ramsey\Uuid\Uuid;
use Source\Domains\Admin\Profile;
use Source\Domains\Admin\User;

/**
 * Class UserRepository
 *
 * @package Source\Domains\Admin\User
 */
class UserRepository extends AbstractRepository
{
    /**
     * @var string
     */
    protected string $prototype = User::class;

    /**
     * @var array
     */
    protected array $filters = [
        'reference' => UserFilterReference::class
    ];

    /**
     * @return Collection
     */
    public function getAdmins(): Collection
    {
        return $this->model
            ::whereHas('profile', static function (Builder $query) {
                $query->where('reference', '=', Profile::REFERENCE_ADMIN);
            })
            ->get();
    }

    /**
     * @return array
     */
    public function getFilterable(): array
    {
        return ['id', 'name', 'username', 'profile.name'];
    }

    /**
     * @return array
     */
    public function getDefaults(): array
    {
        return ['active' => true];
    }

    /**
     * @param string $agent
     *
     * @return string|null
     */
    public function findAgent(string $agent): ?string
    {
        /** @var User $user */
        $user = $this->find(['username' => $agent])->first();
        if (!$user) {
            return null;
        }
        return Uuid::fromString($user->getPrimaryKeyValue())->getBytes();
    }
}
