<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

use Devitools\Http\Status;

/**
 * Class ErrorUserLocked
 * @package Devitools\Exceptions
 */
class ErrorUserLocked extends ErrorGeneral
{
    /**
     * @var int
     */
    protected int $statusCode = Status::CODE_429;

    /**
     * @var string
     */
    protected string $defaultMessage = 'Invalid credentials';
}
