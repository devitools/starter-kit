<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Notification;

use App\Domains\Admin\Notification;
use App\Domains\Admin\Notification\NotificationRepository;
use Devitools\Exceptions\ErrorResourceIsGone;
use Devitools\Exceptions\ErrorUserForbidden;
use Devitools\Http\Controllers\AbstractPersistenceController;
use Devitools\Http\Support\Levels;
use Devitools\Http\Support\Permission;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class MarkAsReadNotificationController
 *
 * @package App\Http\Controllers\Admin\Notification
 */
class MarkAsReadNotificationController extends AbstractPersistenceController
{
    /**
     * @trait
     */
    use Permission;

    /**
     * AthleteController constructor.
     *
     * @param NotificationRepository $repository
     */
    public function __construct(NotificationRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * The __invoke method is called when a script tries to call an object as a function.
     *
     * @param Request $request
     * @param string $id
     *
     * @return mixed
     * @throws ErrorResourceIsGone
     * @throws ErrorUserForbidden
     * @throws Exception
     * @link https://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.invoke
     */
    public function __invoke(Request $request, string $id): JsonResponse
    {
        $this->grant($this->repository()->domain(), Levels::LEVEL_VIEW);

        /** @var NotificationRepository $repository */
        $repository = $this->repository();
        $receipt = now();
        $updated = $repository->markAsRead($id, $receipt);
        if ($updated) {
            $data = [
                Notification::prefixed('recebimento') => $receipt,
                Notification::prefixed('visualizada') => 1,
            ];
            return $this->answerSuccess($data);
        }

        $details = ['id' => $id];
        if ($updated === null) {
            throw new ErrorResourceIsGone($details);
        }
        return $this->answerFail($details);
    }
}
