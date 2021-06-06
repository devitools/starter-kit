<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

/**
 * Class ErrorRuntime
 * @package Devitools\Exceptions
 */
class ErrorRuntime extends ErrorGeneral
{
    /**
     * @var string
     */
    protected string $defaultMessage = 'Unknown error';
}
