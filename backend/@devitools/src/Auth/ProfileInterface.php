<?php

declare(strict_types=1);

namespace Devitools\Auth;

/**
 * Interface ProfileInterface
 *
 * @package Devitools\Auth
 */
interface ProfileInterface
{
    /**
     * @return string
     */
    public function getReference(): string;

    /**
     * @return array
     */
    public function getPermissions(): array;
}
