<?php

declare(strict_types=1);

namespace Source\Http\Routing;

use Devitools\Auth\Login;
use Php\Base64;
use Php\Text;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\JWTAuth;

/**
 * Class AppJWTAuthentication
 *
 * @package Devitools\Http\Routing
 */
class AppJWTAuthentication extends JWTAuth
{
    /**
     * @var string
     */
    protected $staticId;

    /**
     * Authenticate a user via a token.
     *
     * @return JWTSubject|false
     */
    public function authenticate()
    {
        if (!$this->auth->byId($this->staticId)) {
            return false;
        }

        return $this->user();
    }

    /**
     * @param string $authorization
     * @param string $prefix
     *
     * @return $this
     */
    public function setup(string $authorization, string $prefix): self
    {
        $token = Text::trim(Text::replace($authorization, $prefix, ''));
        $secret = Base64::decode($token);
        $user = Login::whereRaw('MD5(username) = ?', $secret)->first();

        if (!$user) {
            throw new UnauthorizedHttpException('jwt-auth', 'User not found');
        }
        $this->staticId = $user->id;
        return $this;
    }
}
