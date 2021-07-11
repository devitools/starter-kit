<?php

declare(strict_types=1);

namespace Devitools\Http\Controllers\Rest;

use Devitools\Exceptions\ErrorResourceIsGone;
use Devitools\Http\Support\Levels;
use Devitools\Persistence\RepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Trait Update
 *
 * @package Devitools\Http\Controllers\Rest
 * @method RepositoryInterface repository()
 */
trait Update
{
    /**
     * @param Request $request
     * @param string $id
     *
     * @return JsonResponse
     * @throws ErrorResourceIsGone
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $this->grant($this->repository()->domain(), Levels::LEVEL_EDIT);

        $data = $this->getData($request);
        if (!$data) {
            return $this->answerFail(['payload' => 'empty']);
        }
        $details = [__PRIMARY_KEY__ => $id];

        $updated = $this->repository()->update($id, $data);
        if ($updated) {
            return $this->answerSuccess(['ticket' => $updated]);
        }
        if ($updated === null) {
            throw new ErrorResourceIsGone($details);
        }
        return $this->answerFail($details);
    }
}
