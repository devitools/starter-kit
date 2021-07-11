<?php

declare(strict_types=1);

namespace App\Domains\Shared;

use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Trait Logger
 *
 * @package App\Domains\Shared
 */
trait Logger
{
    /**
     * @param string $message
     * @param array $context
     */
    protected function info(string $message, array $context): void
    {
        try {
            Log::channel('transaction')->info($message, $context);
        } catch (Throwable $exception) {
            // silent is gold
            app('sentry')->captureException($exception);
        }
        try {
            Log::channel('gelf')->info($message, $context);
        } catch (Throwable $exception) {
            // silent is gold
            app('sentry')->captureException($exception);
        }
    }
}
