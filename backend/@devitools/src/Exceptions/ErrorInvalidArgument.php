<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

/**
 * Class ErrorInvalidArgument
 * @package Devitools\Exceptions
 */
class ErrorInvalidArgument extends ErrorGeneral
{
    /**
     * @var string
     */
    protected string $defaultMessage = 'The argument is not valid';
}
