<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

use Devitools\Http\Status;

/**
 * Class ErrorResourceIsGone
 * @package Devitools\Exceptions
 */
class ErrorResourceIsGone extends ErrorGeneral
{
    /**
     * @var int
     */
    protected int $statusCode = Status::CODE_410;

    /**
     * @var string
     */
    protected string $defaultMessage = 'Gone';
}
