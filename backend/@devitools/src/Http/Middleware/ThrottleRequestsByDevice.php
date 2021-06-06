<?php

declare(strict_types=1);

namespace Devitools\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\ThrottleRequests;
use RuntimeException;

/**
 * Class ThrottleRequestsByDevice
 *
 * @package Devitools\Http\Middleware
 */
class ThrottleRequestsByDevice extends ThrottleRequests
{
    /**
     * Resolve request signature.
     *
     * @param Request $request
     *
     * @return string
     *
     * @throws RuntimeException
     */
    protected function resolveRequestSignature($request)
    {
        if ($user = $request->user()) {
            return sha1($user->getAuthIdentifier());
        }
        if ($device = $request->header('device')) {
            return sha1($device);
        }
        if ($route = $request->route()) {
            return sha1($route->getDomain() . '|' . $request->ip());
        }

        throw new RuntimeException('Unable to generate the request signature. Route unavailable.');
    }
}
