<?php

declare(strict_types=1);

namespace Devitools\Http\Support;

use Devitools\Auth\Login;
use Devitools\Exceptions\ErrorUserForbidden;
use Tymon\JWTAuth\Contracts\JWTSubject;

use function Devitools\Helper\error;
use function in_array;

/**
 * Trait Permission
 *
 * @package Devitools\Http\Support
 */
trait Permission
{
    /**
     * @var bool
     */
    protected bool $allowGuest = false;

    /**
     * @var JWTSubject|null
     */
    private ?JWTSubject $session;

    /**
     * @param string $domain
     * @param string $scope
     * @param bool $special
     *
     * @throws ErrorUserForbidden
     */
    public function grant(string $domain, string $scope = '', bool $special = false): void
    {
        /** @var Login $user */
        $user = auth()->user();
        if (!$user && $this->allowGuest) {
            return;
        }

        $this->session = $user;

        if ($scope) {
            $scope = ".{$scope}";
        }
        $namespace = "{$domain}{$scope}";
        if ($special) {
            $namespace = "special:{$domain}{$scope}";
        }
        $permissions = $user->getPermissions();
        if (in_array($namespace, $permissions, true)) {
            return;
        }

        throw new ErrorUserForbidden(['namespace' => error('namespace', 'required', $namespace)]);
    }

    /**
     * @return JWTSubject|null
     */
    protected function getSession(): ?JWTSubject
    {
        return $this->session;
    }
}
