<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

/**
 * Interface ErrorInterface
 * @package Devitools\Exceptions
 */
interface ErrorInterface
{
    /**
     * @return array
     */
    public function getDetails(): array;

    /**
     * @return int
     */
    public function getStatusCode(): int;
}
