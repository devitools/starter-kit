<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main;

use Devitools\Http\Controllers\AbstractRestController;
use App\Domains\Main\Company\CompanyRepository;

/**
 * Class CompanyController
 *
 * @package Source\Http\Controllers\Main
 */
class CompanyController extends AbstractRestController
{
    /**
     * CompanyController constructor.
     *
     * @param CompanyRepository $repository
     */
    public function __construct(CompanyRepository $repository)
    {
        parent::__construct($repository);
    }
}
