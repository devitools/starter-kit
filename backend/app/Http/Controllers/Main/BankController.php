<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main;

use Devitools\Http\Controllers\AbstractRestController;
use App\Domains\Main\Bank\BankRepository;

/**
 * Class BankController
 *
 * @package App\Http\Controllers\Main
 */
class BankController extends AbstractRestController
{
    /**
     * BankController constructor.
     *
     * @param BankRepository $repository
     */
    public function __construct(BankRepository $repository)
    {
        parent::__construct($repository);
    }
}
