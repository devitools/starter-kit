<?php

declare(strict_types=1);

namespace Devitools\Auth;

/**
 * Interface Authenticator
 *
 * @package Devitools\Auth
 */
interface Authenticator
{
    /**
     * Get the a user profile identifier.
     *
     * @return string
     */
    public function getReference(): string;

    /**
     * Get the list of permission namespaces the user has.
     *
     * @return string[]
     */
    public function getPermissions(): array;

    /**
     * Get an attribute from the model.
     *
     * @param string $name
     *
     * @return mixed
     */
    public function getValue(string $name);
}
