<?php

declare(strict_types=1);

namespace App\Domains\Admin\Notification;

use App\Domains\Admin\Notification;
use App\Domains\Admin\User;
use Devitools\Exceptions\ErrorExternalIntegration;
use Devitools\Exceptions\ErrorInvalidArgument;
use Devitools\Persistence\AbstractRepository as Repository;
use Devitools\Units\Mail\Sender;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Lang;
use stdClass;

/**
 * Class NotificationRepository
 *
 * @package App\Domains\Admin\Notification
 */
class NotificationRepository extends Repository
{
    /**
     * The entity class name used in repository
     *
     * @var string
     */
    protected string $prototype = Notification::class;

    /**
     * @return array
     */
    public function getFilterable(): array
    {
        return [
            Notification::prefixed('codigo'),
            Notification::prefixed('titulo'),
        ];
    }

    /**
     * @param int|string $userId
     * @param string $subject
     * @param string $message
     * @param array $replaces
     *
     * @return string|null
     * @throws ErrorExternalIntegration
     * @throws ErrorInvalidArgument
     */
    public static function user($userId, string $subject, string $message, array $replaces = []): ?string
    {
        $data = [
            Notification::prefixed('cod_USUARIO') => $userId,
            Notification::prefixed('titulo') => Lang::get($subject, $replaces),
            Notification::prefixed('descricao') => Lang::get($message, $replaces),
        ];
        return static::instance()->create($data);
    }

    /**
     * @param stdClass[] $recipients
     * @param string $subject
     * @param string $message
     * @param array $defaults
     *
     * @return string[]
     * @throws ErrorExternalIntegration
     * @throws ErrorInvalidArgument
     */
    public static function permission(array $recipients, string $subject, string $message, array $defaults = []): array
    {
        $created = [];
        foreach ($recipients as $user) {
            $replaces = array_merge($defaults, get_object_vars($user));
            $created[] = static::user($user->id, $subject, $message, $replaces);
        }
        return $created;
    }

    /**
     * @param string $id
     * @param string|Carbon $receipt
     *
     * @return bool|null
     */
    public function markAsRead(string $id, $receipt): ?bool
    {
        /** @var Notification $notification */
        $notification = $this->findById($id);
        if (!$notification) {
            return null;
        }
        $notification->setValue('recebimento', $receipt);
        $notification->setValue('visualizada', true);
        return $notification->save();
    }

    /**
     * @param string $since
     *
     * @return Collection
     */
    protected static function unread(string $since): Collection
    {
        $name = User::prefixed('nome');
        $email = User::prefixed('email');

        $query = DB::table(Notification::resource())
            ->join(
                User::resource(),
                User::prefixed('codigo'),
                '=',
                Notification::prefixed('cod_USUARIO')
            )
            ->where(Notification::prefixed('visualizada'), '=', 0)
            ->where(Notification::prefixed('registro'), '>=', $since)
            ->groupBy(User::prefixed('codigo'));

        return $query
            ->get([$name, $email])
            ->map(static function (stdClass $notification) use ($name, $email) {
                return (object)['name' => $notification->$name, 'email' => $notification->$email];
            });
    }

    /**
     * @param string $since
     *
     * @return array
     */
    public static function mail(string $since): array
    {
        $sent = [];

        $subject = Lang::get('admin/notification.unread.subject');
        $body = Lang::get('admin/notification.unread.message');
        $introduction = Lang::get('admin/notification.unread.introduction');

        $users = static::unread($since);
        foreach ($users as $user) {
            $parameters = [
                'template' => 'admin.notification.unread',
                'payload' => [
                    'name' => $user->name,
                    'introduction' => $introduction,
                    'subject' => $subject,
                    'body' => $body,
                    'link' => webapp('/dashboard/admin/notification'),
                ],
            ];

            $sent[] = "{$user->name}<$user->email>";
            Sender::instance($parameters)
                ->subject($subject)
                ->dispatch($user->email);
        }
        return $sent;
    }
}
