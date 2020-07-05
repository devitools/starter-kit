<?php

declare(strict_types=1);

namespace Source\Domains\General\Type;

use Devitools\Persistence\AbstractRepository;
use Source\Domains\General\Type;

/**
 * Class TypeRepository
 *
 * @package App\Domains\General\Type
 */
class TypeRepository extends AbstractRepository
{
    /**
     * The entity class name used in repository
     *
     * @var string
     */
    protected string $prototype = Type::class;
}
