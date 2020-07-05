<?php

declare(strict_types=1);

namespace Source\Domains\General\Category;

use Devitools\Persistence\AbstractRepository;
use Source\Domains\General\Category;

/**
 * Class CategoryRepository
 *
 * @package Source\Domains\General\Category
 */
class CategoryRepository extends AbstractRepository
{
    /**
     * The entity class name used in repository
     *
     * @var string
     */
    protected string $prototype = Category::class;
}
