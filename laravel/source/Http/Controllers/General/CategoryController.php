<?php

declare(strict_types=1);

namespace Source\Http\Controllers\General;

use Source\Domains\General\Category\CategoryRepository;
use Devitools\Http\Controllers\AbstractRestController;

/**
 * Class CategoryController
 *
 * @package Devitools\Http\Controllers\General
 */
class CategoryController extends AbstractRestController
{
    /**
     * CategoryController constructor.
     *
     * @param CategoryRepository $repository
     */
    public function __construct(CategoryRepository $repository)
    {
        parent::__construct($repository);
    }
}
