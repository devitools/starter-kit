<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main;

use Devitools\Http\Controllers\AbstractRestController;
use App\Domains\Main\Supplier\SupplierRepository;

/**
 * Class SupplierController
 *
 * @package App\Http\Controllers\Main
 */
class SupplierController extends AbstractRestController
{
    /**
     * SupplierController constructor.
     *
     * @param SupplierRepository $repository
     */
    public function __construct(SupplierRepository $repository)
    {
        parent::__construct($repository);
    }
}
