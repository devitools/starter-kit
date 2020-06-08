<?php

declare(strict_types=1);

namespace Source\Http\Controllers\Auth;

use Devitools\Http\Controllers\AbstractController;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Class Refresh
 *
 * @package Source\Http\Controllers\Auth
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
