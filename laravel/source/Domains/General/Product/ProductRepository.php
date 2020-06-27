<?php

declare(strict_types=1);

namespace Source\Domains\General\Product;

use Source\Domains\General\Product;
use Devitools\Persistence\AbstractRepository;

/**
 * Class ProductRepository
 *
 * @package Source\Domains\General\Product
 */
class ProductRepository extends AbstractRepository
{
    /**
     * The entity class name used in repository
     *
     * @var string
     */
    protected string $prototype = Product::class;
}
