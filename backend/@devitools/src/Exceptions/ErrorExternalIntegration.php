<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

/**
 * Class ErrorExternalIntegration
 * @package Devitools\Exceptions
 */
class ErrorExternalIntegration extends ErrorGeneral
{
    /**
     * ErrorExternalIntegration constructor.
     * @param string $message
     */
    public function __construct(string $message)
    {
        parent::__construct([], $message);
    }
}
