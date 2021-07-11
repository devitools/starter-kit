<?php

declare(strict_types=1);

namespace Devitools\Units\Common;

use Exception;
use Illuminate\Support\Facades\Log;
use JsonException;
use Monolog\Handler\FirePHPHandler;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Logger;

use function function_exists;

/**
 * Class Logger
 *
 * @package Devitools\Util
 */
class Console
{
    /**
     * @var string
     */
    public const STREAM = 'storage/logs/console.log';

    /**
     * @var Logger
     */
    protected static $LOGGER;

    /**
     * @return Logger
     */
    protected static function logger()
    {
        if (static::$LOGGER) {
            return static::$LOGGER;
        }

        try {
            static::$LOGGER = new Logger('console');

            $filename = base_path(static::STREAM);
            /** @noinspection SpellCheckingInspection */
            if (function_exists('posix_getpwuid') && function_exists('php_sapi_name')) {
                $processUser = posix_getpwuid(posix_geteuid());
                $processName = $processUser['name'];
                $filename = storage_path('logs/console-' . PHP_SAPI . '-' . $processName . '.log');
            }

            static::$LOGGER->pushHandler(new RotatingFileHandler($filename));
            // static::$LOGGER->pushHandler(new StreamHandler($stream));
            static::$LOGGER->pushHandler(new FirePHPHandler());
        } catch (Exception $exception) {
            Log::error($exception->getMessage());
        }
        return static::$LOGGER;
    }

    /**
     * Log an alert message to the logs.
     *
     * @param mixed $message
     * @param array $context
     *
     * @return void
     */
    public static function alert($message, array $context = [])
    {
        if (!is_scalar($message)) {
            try {
                $message = json_encode($message, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $message = $e->getMessage();
            }
        }
        static::logger()->alert($message, $context);
    }

    /**
     * Log a critical message to the logs.
     *
     * @param mixed $message
     * @param array $context
     *
     * @return void
     */
    public static function critical($message, array $context = [])
    {
        if (!is_scalar($message)) {
            try {
                $message = json_encode($message, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $message = $e->getMessage();
            }
        }
        static::logger()->critical($message, $context);
    }

    /**
     * Log an error message to the logs.
     *
     * @param mixed $message
     * @param array $context
     *
     * @return void
     */
    public static function error($message, array $context = [])
    {
        if (!is_scalar($message)) {
            try {
                $message = json_encode($message, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $message = $e->getMessage();
            }
        }
        static::logger()->error($message, $context);
    }

    /**
     * Log a warning message to the logs.
     *
     * @param mixed $message
     * @param array $context
     *
     * @return void
     */
    public static function warning($message, array $context = [])
    {
        if (!is_scalar($message)) {
            try {
                $message = json_encode($message, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $message = $e->getMessage();
            }
        }
        static::logger()->warning($message, $context);
    }

    /**
     * Log a notice to the logs.
     *
     * @param mixed $message
     * @param array $context
     *
     * @return void
     */
    public static function notice($message, array $context = [])
    {
        if (!is_scalar($message)) {
            try {
                $message = json_encode($message, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $message = $e->getMessage();
            }
        }
        static::logger()->notice($message, $context);
    }

    /**
     * Log an informational message to the logs.
     *
     * @param mixed $message
     * @param array $context
     *
     * @return void
     */
    public static function info($message, array $context = [])
    {
        if (!is_scalar($message)) {
            try {
                $message = json_encode($message, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $message = $e->getMessage();
            }
        }
        static::logger()->info($message, $context);
    }

    /**
     * Log a debug message to the logs.
     *
     * @param mixed $message
     * @param array $context
     *
     * @return void
     */
    public static function debug($message, array $context = [])
    {
        if (!is_scalar($message)) {
            try {
                $message = json_encode($message, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $message = $e->getMessage();
            }
        }
        static::logger()->debug($message, $context);
    }

    /**
     * Log a debug message to the logs.
     *
     * @param mixed $message
     * @param array $context
     *
     * @return void
     */
    public static function log($message, array $context = [])
    {
        if (!is_scalar($message)) {
            try {
                $message = json_encode($message, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $message = $e->getMessage();
            }
        }
        static::logger()->info($message, $context);
    }
}
