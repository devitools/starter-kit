<?php

declare(strict_types=1);

namespace Source\Http\Controllers\General;

use Devitools\Http\Controllers\AbstractRestController;
use Source\Domains\General\Product\ProductRepository;

/**
 * Class ProductController
 *
 * @package Source\Http\Controllers\General
 */
class ProductController extends AbstractRestController
{
    /**
     * CategoryController constructor.
     *
     * @param ProductRepository $repository
     */
    public function __construct(ProductRepository $repository)
    {
        parent::__construct($repository);
    }
}
