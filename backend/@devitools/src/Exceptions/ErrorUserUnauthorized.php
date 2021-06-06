<?php

namespace Devitools\Exceptions;

use Devitools\Http\Status;

/**
 * Class ErrorUserUnauthorized
 * @package Devitools\Exceptions
 */
class ErrorUserUnauthorized extends ErrorGeneral
{
    /**
     * @var int
     */
    protected int $statusCode = Status::CODE_401;

    /**
     * @var string
     */
    protected string $defaultMessage = 'Invalid credentials';
}
