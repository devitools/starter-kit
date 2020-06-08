<?php

declare(strict_types=1);

namespace Source\Http\Controllers\Auth;

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
    public function __invoke(Request $request, Session $session)
    {
        $username = $request->post('username');
        $password = $request->post('password');
        $device = $request->header('device', 'undefined');

        $signIn = $this->signIn($session, $username, $password, $device);
        if (!$signIn) {
            return $this->answerFail(['user' => 'required', 'password' => 'required']);
        }
        return $this->answerSuccess($signIn);
    }

    /**
     * @param Session $session
     * @param $username
     * @param $password
     * @param $device
     *
     * @return array|mixed|null
     * @throws ErrorUserInative
     * @throws ErrorUserUnauthorized
     */
    protected function signIn(Session $session, $username, $password, $device)
    {
        if (!$username || !$password) {
            return $this->answerFail(['user' => 'required', 'password' => 'required']);
        }

        try {
            return $session->login($username, $password, $device);
        } catch (ErrorUserUnauthorized | ErrorUserInative $exception) {
            throw $exception;
        }
    }
}
