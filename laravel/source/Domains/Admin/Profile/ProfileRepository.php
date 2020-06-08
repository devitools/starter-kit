<?php

declare(strict_types=1);

namespace Source\Domains\Admin\Profile;

use Devitools\Persistence\AbstractRepository as Repository;
use Source\Domains\Admin\Profile;

/**
 * Class ProfileRepository
 * @package Source\Domains\Admin\Profile
 */
class ProfileRepository extends Repository
{
    /**
     * The entity class name used in repository
     *
     * @var string
     */
    protected string $prototype = Profile::class;

    /**
     * @return array
     */
    public function getFilterable(): array
    {
        return ['name', 'reference'];
    }

    /**
     * @param string $reference
     *
     * @return mixed
     */
    public function getProfileByReference(string $reference)
    {
        return $this->model->where('reference', $reference)->first();
    }
}
