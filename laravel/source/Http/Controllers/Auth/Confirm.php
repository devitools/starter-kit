<?php

declare(strict_types=1);

namespace Source\Http\Controllers\Auth;

use Devitools\Exceptions\ErrorResourceIsGone;
use Devitools\Exceptions\ErrorValidation;
use Devitools\Http\Controllers\AbstractController;
use Exception;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Source\Domains\Admin\User;
use Source\Domains\Admin\User\UserRepository;

/**
 * Class Confirm
 *
 * @package Source\Http\Controllers\Auth
 */
class Confirm extends AbstractController
{
    /**
     * Confirm password reset request
     *
     * @param Request $request
     * @param UserRepository $userRepository
     *
     * @return JsonResponse
     * @throws ErrorResourceIsGone
     * @throws ErrorValidation
     * @throws Exception
     */
    public function __invoke(Request $request, UserRepository $userRepository)
    {
        // extract password and confirmation of password from request
        $password = $request->post('password');
        $confirm = $request->post('confirm');

        // validate password and confirmation
        $this->validatePassword($password, $confirm);

        // if we have an activation code in request we will resolve the confirm here
        $activation = $request->post('activation');
        if ($activation) {
            // get the user by activation code
            $user = $userRepository->findByRememberToken($activation);
            $details = ['activation' => 'invalid'];

            return $this->confirm($user, $password, $details);
        }

        // if we have a token in request we will resolve the confirm here
        $token = $request->post('token');
        if ($token) {
            // get the user by token
            $user = $userRepository->findByResetToken($token);
            // the user exists we can destroy the password reset request
            if ($user) {
                $userRepository->destroyResetPassword($token, $password);
            }
            $details = ['token' => 'invalid'];

            return $this->confirm($user, $password, $details);
        }

        // if it doesn't have an activation code or a token throw an error
        throw new ErrorValidation(['reference' => 'invalid']);
    }

    /**
     * @param string $password
     * @param string $confirm
     *
     * @throws ErrorValidation
     */
    private function validatePassword($password, $confirm)
    {
        // both password and confirm must be filled
        if (!$password or !$confirm) {
            $details = [];
            if (!$password) {
                $details['password'] = 'required';
            }
            if (!$confirm) {
                $details['confirm'] = 'required';
            }
            throw new ErrorValidation($details);
        }

        // check if password and confirm are equals
        if ($password !== $confirm) {
            throw new ErrorValidation(['confirm' => 'sameAs(password)']);
        }
    }

    /**
     * @param Eloquent $user
     * @param string $password
     * @param array $details
     *
     * @return JsonResponse
     * @throws ErrorResourceIsGone
     */
    protected function confirm($user, string $password, array $details = []): JsonResponse
    {
        // if user is valid
        /** @var User $user */
        if ($user instanceof Eloquent) {
            // change password
            $user->password = $password;
            // clear the activation code
            $user->remember_token = '';
            // activate user
            $user->active = true;

            // save the changes
            $user->save();

            return $this->answerSuccess(['user' => $user->id]);
        }

        // else the user is invalid
        throw new ErrorResourceIsGone($details);
    }
}
