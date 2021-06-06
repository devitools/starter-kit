<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

use Devitools\Http\Status;

/**
 * Class ErrorInvalidTabulationData
 * @package Devitools\Exceptions
 */
class ErrorInvalidIntegration extends ErrorGeneral
{
    /**
     * @var int
     */
    protected int $statusCode = Status::CODE_400;

    /**
     * @var string
     */
    protected string $defaultMessage = 'Invalid values to integration';
}
