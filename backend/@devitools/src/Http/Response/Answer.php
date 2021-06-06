<?php

declare(strict_types=1);

namespace Devitools\Http\Response;

use Devitools\Http\Status;
use ForceUTF8\Encoding;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use Throwable;

use function array_walk_recursive;
use function is_string;
use function mb_detect_encoding;

/**
 * Class Answer
 *
 * @package Devitools\Http\Response\Answer
 */
abstract class Answer
{
    /**
     * @param mixed $data
     * @param array $meta
     * @param int $code
     *
     * @return JsonResponse
     */
    public static function success($data, array $meta, int $code = Status::CODE_200): JsonResponse
    {
        $response = [
            'status' => 'success',
            'data' => $data,
            'meta' => $meta,
        ];
        return static::response($response, $code);
    }

    /**
     * @param mixed $data
     * @param array $meta
     * @param int $code
     *
     * @return JsonResponse
     */
    public static function fail($data, array $meta, int $code = Status::CODE_400): JsonResponse
    {
        $response = [
            'status' => 'fail',
            'data' => $data,
            'meta' => $meta,
        ];
        return static::response($response, $code);
    }

    /**
     * @param string $message
     * @param int $code
     * @param mixed $meta
     * @param bool $commit
     * @param bool $debug
     *
     * @return JsonResponse
     */
    public static function error(
        $message,
        $code = null,
        $meta = null,
        $commit = null,
        $debug = null
    ): JsonResponse {
        $response = [
            'commit' => $commit,
            'status' => 'error',
            'message' => $message,
        ];

        $response['code'] = $code ?? Status::CODE_500;

        if ($meta !== null) {
            $response['meta'] = $meta;
        }

        if ($debug !== null) {
            $response['$debug'] = $debug;
        }

        return static::response($response, $code);
    }

    /**
     * @param array $data
     * @param int $code
     *
     * @return JsonResponse
     */
    protected static function response(array $data, int $code): JsonResponse
    {
        try {
            return Response::json($data, $code);
        } /** @noinspection BadExceptionsProcessingInspection */ catch (Throwable $throwable) {
        }
        array_walk_recursive($data, static function (&$item) {
            if (is_string($item) && !mb_detect_encoding($item, 'utf-8', true)) {
                $item = Encoding::fixUTF8($item);
            }
        });
        return Response::json($data, $code);
    }
}
