<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Domains\Auth\Session;
use Devitools\Exceptions\ErrorExternalIntegration;
use Devitools\Exceptions\ErrorInvalidArgument;
use Devitools\Http\Controllers\AbstractController;
use Illuminate\Http\Request;

/**
 * Class Change
 *
 * @package App\Http\Controllers\Auth
 */
class Change extends AbstractController
{
    /**
     * @param Request $request
     * @param Session $session
     *
     * @return mixed
     * @throws ErrorExternalIntegration
     * @throws ErrorInvalidArgument
     */
    public function __invoke(Request $request, Session $session): mixed
    {
        $username = (string)$request->post('username');
        $code = (string)$request->post('code');
        $password = (string)$request->post('password');
        $confirmPassword = (string)$request->post('confirmPassword');

        $fail = ['code' => 'required', 'password' => 'required', 'confirmPassword' => 'required'];
        if (!$code || !$password || !$confirmPassword || ($password !== $confirmPassword)) {
            return $this->answerFail($fail);
        }

        $changed = $session->changePassword($username, $code, $password);
        if (!$changed) {
            return $this->answerFail($fail);
        }
        return $this->answerSuccess($changed);
    }
}
