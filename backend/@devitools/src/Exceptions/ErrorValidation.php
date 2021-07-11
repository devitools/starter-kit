<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

use Devitools\Http\Status;

/**
 * Class ErrorValidation
 *
 * @package Devitools\Exceptions
 */
class ErrorValidation extends ErrorGeneral
{
    /**
     * @var int
     */
    protected int $statusCode = Status::CODE_400;

    /**
     * @var string
     */
    protected string $defaultMessage = 'Invalid input';
}
