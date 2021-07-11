<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

use Devitools\Http\Status;

/**
 * Class ErrorUserForbidden
 * @package Devitools\Exceptions
 */
class ErrorUserForbidden extends ErrorGeneral
{
    /**
     * @var int
     */
    protected int $statusCode = Status::CODE_403;

    /**
     * @var string
     */
    protected string $defaultMessage = 'Invalid credentials';
}
