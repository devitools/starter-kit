<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

use Devitools\Http\Status;

/**
 * Class ErrorUserInative
 * @package Devitools\Exceptions
 */
class ErrorUserInative extends ErrorGeneral
{
    /**
     * @var int
     */
    protected int $statusCode = Status::CODE_402;

    /**
     * @var string
     */
    protected string $defaultMessage = 'Invalid credentials';
}
