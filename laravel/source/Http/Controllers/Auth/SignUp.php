<?php

declare(strict_types=1);

namespace Source\Http\Controllers\Auth;

use Devitools\Exceptions\ErrorRuntime;
use Devitools\Http\Controllers\AbstractController;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Php\Text;
use Source\Domains\Admin\Profile;
use Source\Domains\Admin\Profile\ProfileRepository;
use Source\Domains\Admin\User;
use Source\Domains\Admin\User\UserRepository;

/**
 * Class Register
 *
 * @package Source\Http\Controllers\Auth
 */
class SignUp extends AbstractController
{
    /**
     * Create a new user
     *
     * @param Request $request
     * @param UserRepository $userRepository
     * @param ProfileRepository $profileRepository
     *
     * @return JsonResponse
     * @throws ErrorRuntime
     * @throws Exception
     */
    public function __invoke(Request $request, UserRepository $userRepository, ProfileRepository $profileRepository)
    {
        # get the data to create an user
        $name = $request->post('name');
        $username = $request->post('username');
        $email = $request->post('email');
        $phone = $request->post('phone');
        $password = $request->post('password');
        $agent = $request->post('agent');

        # get the profile to regular user
        /** @var Profile $profile */
        $profile = $profileRepository->getProfileByReference(Profile::REFERENCE_REGULAR);
        $profileId = $profile->getValue('uuid');

        # get the id of agent
        $userId = null;
        if ($agent) {
            $userId = $userRepository->findAgent($agent);
        }
        # create the data
        $data = [
            'profileId' => $profileId,
            'username' => $username,
            'password' => $password,
            'name' => $name ?? Text::capitalize($username),
            'email' => $email,
            'phone' => $phone,
            'userId' => $userId,
            'active' => true,
        ];
        # create the user
        $id = $userRepository->create($data);

        # get the user object filled
        /** @var User $user */
        $user = $userRepository->findById($id);

        # if $user something is wrong...
        if (!$user) {
            # ...trigger an error
            throw new ErrorRuntime(['error' => 'Error on register user']);
        }

        # answer with the created user
        return $this->answerSuccess($user);
    }
}
