<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use Devitools\Auth\Session;
use Devitools\Exceptions\ErrorUserInative;
use Devitools\Exceptions\ErrorUserUnauthorized;
use Devitools\Http\Controllers\AbstractController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class SignIn
 *
 * @package Source\Http\Controllers\Auth
 */
class SignIn extends AbstractController
{
    /**
     * @param Request $request
     * @param Session $session
     *
     * @return JsonResponse
     * @throws ErrorUserInative
     * @throws ErrorUserUnauthorized
     */
    public function __invoke(Request $request, Session $session): JsonResponse
    {
        $email = $request->post('email');
        $password = $request->post('password');

        if (!$email || !$password) {
            return $this->answerFail(['user' => 'required', 'password' => 'required']);
        }
        $device = $request->header('device', 'undefined');

        $token = $session->login($email, $password, $device);
        if (!$token) {
            return $this->answerFail(['user' => 'required', 'password' => 'required']);
        }
        return $this->answerSuccess($token);
    }
}
