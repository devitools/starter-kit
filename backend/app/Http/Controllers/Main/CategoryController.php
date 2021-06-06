<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main;

use Devitools\Http\Controllers\AbstractRestController;
use App\Domains\Main\Category\CategoryRepository;

/**
 * Class CategoryController
 *
 * @package Source\Http\Controllers\Main
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
