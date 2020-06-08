<?php

declare(strict_types=1);

namespace Source\Http\Controllers\Auth;

use Devitools\Auth\Login;
use Devitools\Exceptions\ErrorValidation;
use Devitools\Http\Controllers\AbstractController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class Me
 *
 * @package Source\Http\Controllers\Auth
 */
class Me extends AbstractController
{
    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws ErrorValidation
     */
    public function __invoke(Request $request)
    {
        $auth = auth();
        if ($auth->guest()) {
            throw new ErrorValidation(['session' => 'required']);
        }

        $user = $auth->user();
        if (!($user instanceof Login)) {
            throw new ErrorValidation(['user' => 'required']);
        }

        $data = $user->getAttributes();

        $data['profile'] = $user->getReference();
        $data['permissions'] = $user->getPermissions()->pluck('namespace');

        unset($data['uuid'], $data['profileId'], $data['password']);

        return $this->answerSuccess($data);
    }
}
