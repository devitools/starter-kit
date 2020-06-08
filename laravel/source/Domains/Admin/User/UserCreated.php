<?php

declare(strict_types=1);

namespace Source\Domains\Admin\User;

use Devitools\Units\Mail\Sender;
use Illuminate\Support\Facades\Lang;
use Source\Domains\Admin\User;

/**
 * Class UserCreated
 * @package Source\Domains\Admin\User
 */
class UserCreated
{
    /**
     * UserCreated constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        // $this->sendCreationEmail($user);
    }

    /**
     * @param User $user
     * @return void
     */
    private function sendCreationEmail(User $user): void
    {
        $user->activation_link = env('APP_CLIENT') . "/auth/confirm/{$user->remember_token}";

        $subject = Lang::get('admin/user/created.message.subject');
        $action = Lang::get('admin/user/created.message.action');

        $parameters = [
            'template' => 'admin.user.created',
            'data' => (object)[
                'username' => $user->username,
                'name' => $user->name,
                'activation_link' => $user->activation_link,
                'subject' => $subject,
                'action' => $action,
            ],
        ];

        Sender::instance($parameters)
            ->subject($subject)
            ->dispatch($user->username);
    }
}
