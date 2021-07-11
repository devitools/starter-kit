<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use Devitools\Http\Controllers\AbstractController;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;

/**
 * Class Refresh
 *
 * @package App\Http\Controllers\Auth
 */
class Refresh extends AbstractController
{
    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function __invoke()
    {
        /** @var JWT $auth */
        $auth = auth();

        $token = $auth->refresh();

        $payload = $auth->payload();

        /** @noinspection PhpUndefinedMethodInspection */
        $token_expires_at = JWTAuth::setToken($token)->getPayload()->get('exp');

        return $this->answerSuccess([
            'token' => $token,
            'token_type' => 'bearer',
            'token_expires_at' => $token_expires_at,
            'session' => $payload->get('session'),
        ]);
    }
}
