<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Domains\Auth\Session;
use App\Http\Controllers\Auth\Helper\Captcha;
use Devitools\Http\Controllers\AbstractController;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class Recover
 *
 * @package App\Http\Controllers\Auth
 */
class Recover extends AbstractController
{
    /**
     * @trait
     */
    use Captcha;

    /**
     * @param Request $request
     * @param Session $session
     *
     * @return mixed
     * @throws Exception
     */
    public function __invoke(Request $request, Session $session): mixed
    {
        $username = (string)$request->post('username');

        if (!env('APP_USE_CAPTCHA')) {
            return $this->recover($session, $username);
        }

        return $this->answerWithRecaptcha($request, function () use ($session, $username) {
            return $this->recover($session, $username);
        });
    }

    /**
     * @param Session $session
     * @param string $username
     *
     * @return JsonResponse
     * @throws Exception
     */
    protected function recover(Session $session, string $username): JsonResponse
    {
        if (!$username) {
            return $this->answerFail(['user' => 'required', 'password' => 'required']);
        }

        $data = $session->generateCode($username);
        if (!$data) {
            return $this->answerFail(['username' => 'required']);
        }
        return $this->answerSuccess($data);
    }
}
