<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main;

use Devitools\Http\Controllers\AbstractRestController;
use App\Domains\Main\BankAccount\BankAccountRepository;

/**
 * Class BankAccountController
 *
 * @package Source\Http\Controllers\Main
 */
class BankAccountController extends AbstractRestController
{
    /**
     * BankAccountController constructor.
     *
     * @param BankAccountRepository $repository
     */
    public function __construct(BankAccountRepository $repository)
    {
        parent::__construct($repository);
    }
}
