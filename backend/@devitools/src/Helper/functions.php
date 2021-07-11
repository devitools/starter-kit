<?php

declare(strict_types=1);

namespace Devitools\Helper;

use Devitools\Exceptions\ErrorInvalidArgument;
use Devitools\Persistence\Filter\Filters;
use Devitools\Persistence\Value\Currency;
use Exception;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;
use Throwable;
use TypeError;

use function is_int;
use function PhpBrasil\Collection\Helper\stringify;
use function request;

if (!function_exists('uuid')) {
    /**
     * @return string
     * @throws Exception
     */
    function uuid(): string
    {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            // 32 bits for "time_low"
            random_int(0, 0xffff),
            random_int(0, 0xffff),
            // 16 bits for "time_mid"
            random_int(0, 0xffff),
            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            random_int(0, 0x0fff) | 0x4000,
            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            random_int(0, 0x3fff) | 0x8000,
            // 48 bits for "node"
            random_int(0, 0xffff),
            random_int(0, 0xffff),
            random_int(0, 0xffff)
        );
    }
}

if (!function_exists('encodeUuid')) {
    /**
     * @param string $value
     *
     * @return string
     */
    function encodeUuid(string $value): string
    {
        return Uuid::fromString($value)->getBytes();
    }
}

if (!function_exists('decodeUuid')) {
    /**
     * @param string $value
     *
     * @return string
     */
    function decodeUuid(string $value): string
    {
        return Uuid::fromBytes($value)->toString();
    }
}

if (!function_exists('is_binary')) {
    /**
     * @param mixed $content
     *
     * @return bool
     */
    function is_binary($content): bool
    {
        if (!is_scalar($content)) {
            return false;
        }
        return preg_match('~[^\x20-\x7E\t\r\n]~', stripAccents((string)$content)) > 0;
    }
}

if (!function_exists('stripAccents')) {
    /**
     * @param string $value
     *
     * @return string
     */
    function stripAccents(string $value): string
    {
        /** @noinspection SpellCheckingInspection */
        return strtr(
            $value,
            'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ',
            'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY'
        );
    }
}

if (!function_exists('url')) {
    /**
     * @param string $path
     *
     * @return string
     */
    function url(string $path): string
    {
        return env('APP_URL') . str_replace('//', '/', "/{$path}");
    }
}

if (!function_exists('error')) {
    /**
     * @param string $property
     * @param string $message
     * @param $value
     * @param array $parameters
     * @param null $code
     *
     * @return array
     */
    function error(string $property, string $message, $value, array $parameters = [], $code = null): array
    {
        return [
            'property_path' => $property,
            'message' => $message,
            'value' => $value,
            'parameters' => $parameters,
            'code' => $code,
        ];
    }
}

if (!function_exists('numberToCurrency')) {
    /**
     * @param float|int|null $number
     *
     * @return int
     */
    function numberToCurrency($number): int
    {
        try {
            return Currency::fromNumber($number)->toInteger();
        } catch (ErrorInvalidArgument $e) {
            return 0;
        }
    }
}

if (!function_exists('currencyToNumber')) {
    /**
     * @param int|Currency|null $currency
     *
     * @return float
     */
    function currencyToNumber($currency): float
    {
        if ($currency instanceof Currency) {
            return $currency->toNumber();
        }
        if ($currency === null) {
            $currency = 0;
        }
        if (!is_int($currency)) {
            $string = stringify($currency);
            throw new TypeError("Currency must be int or Currency, '{$string}' given");
        }
        return Currency::fromInteger($currency)->toNumber();
    }
}

if (!function_exists('currencyFormat')) {
    /**
     * @param int $currency
     *
     * @return string
     */
    function currencyFormat(int $currency): string
    {
        $number = currencyToNumber($currency);
        $decimals = env('APP_PRECISION', 2);
        $decimalSeparator = env('APP_DECIMAL_SEPARATOR', '.');
        $thousandSeparator = env('APP_DECIMAL_SEPARATOR', '');
        return number_format($number, $decimals, $decimalSeparator, $thousandSeparator);
    }
}

if (!function_exists('is_dot')) {
    /**
     * @param string $text
     *
     * @return bool
     */
    function is_dot(string $text): bool
    {
        return ((int)mb_strpos($text, '.')) > 1;
    }
}

if (!function_exists('ip')) {
    /**
     * @return string|null
     */
    function ip(): ?string
    {
        return $_SERVER['HTTP_CLIENT_IP']
            ?? $_SERVER['HTTP_X_FORWARDED_FOR']
            ?? $_SERVER['HTTP_X_FORWARDED']
            ?? $_SERVER['HTTP_FORWARDED_FOR']
            ?? $_SERVER['HTTP_FORWARDED']
            ?? $_SERVER['REMOTE_ADDR']
            ?? request()->ip();
    }
}

if (!function_exists('counter')) {
    /**
     * @param int|null $sleep
     *
     * @return int
     */
    function counter(int $sleep = null): int
    {
        if ($sleep) {
            sleep(0);
        }
        try {
            $random = (string)random_int(100, 999);
        } catch (Throwable $error) {
            $random = '101';
        }
        $micro = (string)(microtime(true) * 10000);
        $size = 18;
        $counter = mb_substr(str_pad($micro . $random, $size, '0'), 0, $size);
        return (int)$counter;
    }
}

if (!function_exists('idToArray')) {
    /**
     * @param string $id
     *
     * @return array|string[]
     */
    function idToArray(string $id): array
    {
        $ids = [$id];
        preg_match_all("/^\[(?<uuid>.*)]$/", $id, $matches);
        if (isset($matches[__BINARY_KEY__][0])) {
            $ids = explode(',', $matches[__BINARY_KEY__][0]);
        }
        return $ids;
    }
}

if (!function_exists('dashesToCamelCase')) {
    /**
     * @param string $string
     * @param bool $capitalizeFirst
     *
     * @return string
     */
    function dashesToCamelCase(string $string, bool $capitalizeFirst = false): string
    {
        $string = str_replace('-', '', ucwords($string, '-'));
        if (!$capitalizeFirst) {
            $string = lcfirst($string);
        }
        return $string;
    }
}

if (!function_exists('camel_keys')) {
    /**
     * Convert array keys to camel case recursively.
     *
     * @param array $array
     *
     * @return array
     */
    function camel_keys(array $array): array
    {
        $result = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $value = camel_keys($value);
            }
            $result[Str::camel($key)] = $value;
        }
        return $result;
    }
}

if (!function_exists('snake_keys')) {
    /**
     * Convert array keys to snake case recursively.
     *
     * @param array $array
     * @param string $delimiter
     *
     * @return array
     */
    function snake_keys(array $array, string $delimiter = '_'): array
    {
        $result = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $value = snake_keys($value, $delimiter);
            }
            $result[Str::snake($key, $delimiter)] = $value;
        }
        return $result;
    }
}

if (!function_exists('uuidToDatabase')) {
    /**
     * @param string $uuid
     *
     * @return string
     */
    function uuidToDatabase(string $uuid): string
    {
        $uuid = mb_strtoupper($uuid);
        $pieces = explode('-', $uuid);
        return "0x{$pieces[2]}{$pieces[1]}{$pieces[0]}{$pieces[3]}{$pieces[4]}";
    }
}

if (!function_exists('baseURL')) {
    /**
     * @return string
     */
    function baseURL(): string
    {
        $host = filter_input(INPUT_SERVER, 'HTTP_HOST');
        $self = filter_input(INPUT_SERVER, 'PHP_SELF');
        $path = str_replace('/index.php', '', $self);
        return "//{$host}{$path}";
    }
}

if (!function_exists('withSeparator')) {
    /**
     * @param string $value
     * @param string $operator
     *
     * @return string
     */
    function withSeparator(string $value, string $operator = 'eq'): string
    {
        return $operator . Filters::SEPARATION_OPERATOR . $value;
    }
}

if (!function_exists('withoutSeparator')) {
    /**
     * @param string $value
     *
     * @return string
     */
    function withoutSeparator(string $value): string
    {
        $array = explode(Filters::SEPARATION_OPERATOR, $value);
        return array_pop($array);
    }
}

if (!function_exists('parseSeparator')) {
    /**
     * @param string $filter
     *
     * @return array|null
     */
    function parseSeparator(string $filter): ?array
    {
        preg_match_all('/^(?<operator>.*)' . Filters::SEPARATION_OPERATOR . '(?<value>.*)$/', $filter, $matches);
        if (isset($matches['operator'][0], $matches['value'][0])) {
            $value = $matches['value'][0];
            $operator = $matches['operator'][0];
            return ['$value' => $value, '$operator' => $operator];
        }
        return null;
    }
}
