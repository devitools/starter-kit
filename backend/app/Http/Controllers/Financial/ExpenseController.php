<?php

declare(strict_types=1);

namespace App\Http\Controllers\Financial;

use Devitools\Http\Controllers\AbstractRestController;
use App\Domains\Financial\Expense\ExpenseRepository;

/**
 * Class ExpenseController
 *
 * @package App\Http\Controllers\Financial
 */
class ExpenseController extends AbstractRestController
{
    /**
     * ExpenseController constructor.
     *
     * @param ExpenseRepository $repository
     */
    public function __construct(ExpenseRepository $repository)
    {
        parent::__construct($repository);
    }
}
