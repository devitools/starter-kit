<?php

declare(strict_types=1);

namespace Devitools\Auth;

use Devitools\Exceptions\ErrorUserInative;
use Devitools\Exceptions\ErrorUserUnauthorized;
use Devitools\Units\Common\Instance;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Throwable;
use Tymon\JWTAuth\Facades\JWTAuth;

use function Devitools\Helper\uuid;

/**
 * Class Session
 *
 * @package Source\Domains\Auth
 */
class Session extends Login
{
    /**
     * @trait
     */
    use Instance;

    /**
     * @param string $username
     * @param string $password
     * @param string $device
     *
     * @return array
     * @throws ErrorUserInative
     * @throws ErrorUserUnauthorized
     */
    public function login(string $username, string $password, string $device = ''): array
    {
        $user = $this->getUser($username);

        /**
         * @throws ErrorUserInative
         * @throws ErrorUserUnauthorized
         */
        $this->validate($user, $password);

        return $this->credentials($user, $device);
    }

    /**
     * @param Authenticator|null $user
     * @param string $device
     *
     * @return array
     * @throws ErrorUserUnauthorized
     * @throws Exception
     */
    protected function credentials(?Authenticator $user, string $device): array
    {
        if ($user === null) {
            throw new ErrorUserUnauthorized(['credentials' => 'unknown']);
        }

        $session = uuid();
        $id = $user->getValue(__PRIMARY_KEY__);
        $customClaims = ['session' => $session];

        /** @noinspection PhpUndefinedMethodInspection */
        $token = JWTAuth::claims($customClaims)->fromUser($user);

        if (!$token) {
            throw new ErrorUserUnauthorized(['credentials' => 'invalid']);
        }

        Cache::forever($session, [__PRIMARY_KEY__ => $id, 'device' => $device]);

        /** @noinspection PhpUndefinedMethodInspection */
        $token_expires_at = JWTAuth::setToken($token)->getPayload()->get('exp');

        return [
            'token' => $token,
            'token_type' => 'bearer',
            'token_expires_at' => $token_expires_at,
            'session' => $session,
            'type' => $user->getReference(),
        ];
    }

    /**
     * @param string $username
     *
     * @return Authenticator
     */
    protected function getUser(string $username): ?Authenticator
    {
        $query = (new static())
            ->newQuery()
            ->where(config('auth.fields.username', 'username'), $username);

        try {
            /** @noinspection PhpUndefinedMethodInspection */
            $user = $query->withTrashed()->first();
        } catch (Throwable $error) {
            $user = $query->first();
        }
        return $user;
    }

    /**
     * @param Authenticator|null $user
     * @param string $password
     *
     * @throws ErrorUserInative
     * @throws ErrorUserUnauthorized
     */
    protected function validate(?Authenticator $user, string $password)
    {
        if ($user === null) {
            throw new ErrorUserUnauthorized(['credentials' => 'unknown']);
        }

        $deleted = (string)$user->getValue(Login::DELETED_AT);
        if ($deleted) {
            throw new ErrorUserInative(['user' => 'unavailable']);
        }

        if (!Hash::check($password, $user->getValue(config('auth.fields.password', 'password')))) {
            throw new ErrorUserUnauthorized(['credentials' => 'invalid']);
        }

        $active = config('auth.fields.active', 'active');
        if ($active && !$user->getValue($active)) {
            throw new ErrorUserInative(['user' => 'inactive']);
        }
    }
}
