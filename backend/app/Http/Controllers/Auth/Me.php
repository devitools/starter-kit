<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use Devitools\Auth\Login;
use Devitools\Exceptions\ErrorValidation;
use Devitools\Http\Controllers\AbstractController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class Me
 *
 * @package App\Http\Controllers\Auth
 */
class Me extends AbstractController
{
    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws ErrorValidation
     */
    public function __invoke(Request $request): JsonResponse {
        $auth = auth();
        if ($auth->guest()) {
            throw new ErrorValidation(['session' => 'required']);
        }

        $login = $auth->user();
        if (!$login instanceof Login) {
            throw new ErrorValidation(['user' => 'required']);
        }
        $data = [];
        $data['profile'] = $login->getReference();
        $data['permissions'] = $login->getPermissions();

        $data['timestamp'] = now()->format('d-m-Y H:i:s');

        $attributes = $login->getAttributes();
        $mapper = [
            'username' => 'email',
            'name' => 'name',
            'email' => 'email',
            'active' => 'active',
            'photo' => 'photo',
        ];
        foreach ($mapper as $key => $target) {
            if (!isset($attributes[$target])) {
                continue;
            }
            $data[$key] = $attributes[$target];
        }
        if (!isset($data['photo'])) {
            $data['photo'] = '/admin/user/no-photo.png';
        }
        return $this->answerSuccess($data);
    }
}
