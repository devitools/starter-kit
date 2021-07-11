<?php

declare(strict_types=1);

namespace Report;

use DateTime;
use Throwable;

use function Devitools\Helper\currencyFormat;
use function Php\prop;

/**
 * @param mixed $value
 * @param string $property
 * @param null $fallback
 *
 * @return mixed
 */
function property($value, string $property, $fallback = null)
{
    return prop($value, $property, $fallback);
}

/**
 * @param mixed $row
 * @param string $property
 *
 * @return mixed
 */
function value($row, string $property)
{
    return property($row, $property);
}

/**
 * @param mixed $row
 * @param string $property
 * @param int $precision
 * @param string $decimals
 * @param string $thousands
 *
 * @return string
 */
function valueNumber(
    $row,
    string $property,
    int $precision = 2,
    string $decimals = ',',
    string $thousands = '.'
): string {
    $value = (float)value($row, $property);
    return number_format($value, $precision, $decimals, $thousands);
}

/**
 * @param mixed $row
 * @param string $property
 * @param array $options
 * @param string $fallback
 *
 * @return string
 */
function valueSelect($row, string $property, array $options, string $fallback = ' - '): string
{
    $value = $row->$property ?? null;
    return $options[$value] ?? $fallback;
}

/**
 * @param mixed $row
 * @param string $property
 * @param string $fallback
 *
 * @return string
 */
function valueDate($row, string $property, string $fallback = ' - '): string
{
    try {
        $value = $row->$property ?? null;
        if ($value === null) {
            return '';
        }
        $date = DateTime::createFromFormat('Y-m-d', $value);
        if (!$date) {
            return $fallback;
        }
        return $date->format('d/m/Y');
    } catch (Throwable $exception) {
        return '';
    }
}

/**
 * @param mixed $row
 * @param string $property
 * @param string $fallback
 *
 * @return string
 */
function valueDatetime($row, string $property, string $fallback = ' - '): string
{
    try {
        $value = $row->$property ?? null;
        if ($value === null) {
            return '';
        }
        $value = $row->$property ?? null;
        $date = DateTime::createFromFormat('Y-m-d H:i:s', $value);
        if (!$date) {
            return $fallback;
        }
        return $date->format('d/m/Y H:i:s');
    } catch (Throwable $exception) {
        return '';
    }
}

/**
 * @param mixed $row
 * @param string $property
 * @param bool $currency
 *
 * @return string
 */
function valueCurrency($row, string $property, bool $currency = false): string
{
    if ($currency) {
        $value = currencyFormat(value($row, $property));
    } else {
        $precision = 2;
        $decimals = ',';
        $thousands = '.';
        $value = valueNumber($row, $property, $precision, $decimals, $thousands);
    }

    return env('APP_CURRENCY', '$') . ' ' . $value;
}

/**
 * @param mixed $row
 * @param string $property
 *
 * @return mixed
 */
function responsible($row, string $property)
{
    $regex = '/^(.*)\s\[.*]/';
    $value = property($row, $property, ' - ');

    preg_match_all($regex, $value, $matches, PREG_SET_ORDER);

    return $matches[0][1] ?? $value;
}

namespace Report\Info;

use DateTime;
use stdClass;
use Throwable;

/**
 * @param stdClass|array $info
 *
 * @return string
 */
function label($info): string
{
    if (is_array($info)) {
        $info = (object)$info;
    }
    return $info->label ?? '';
}

/**
 * @param stdClass|array $info
 *
 * @return string
 */
function value($info): string
{
    if (is_array($info)) {
        $info = (object)$info;
    }
    $type = $info->type ?? null;
    $value = $info->value;
    if ($type === 'datetime') {
        return datetime($value);
    }
    if ($type === 'date') {
        return date($value);
    }
    if ($type === 'boolean') {
        return boolean($value);
    }
    if ($type === 'string') {
        return string($value);
    }
    if ($type === 'select' || $type === 'options') {
        return select($info);
    }

    return $value;
}

/**
 * @param string $value
 *
 * @return string
 */
function datetime(string $value): string
{
    try {
        return DateTime::createFromFormat('Y-m-d H:i:s', $value)->format('d/m/Y H:i:s');
    } catch (Throwable $throwable) {
        // silence is gold
    }
    return '-';
}

/**
 * @param string $value
 *
 * @return string
 */
function date(string $value): string
{
    try {
        return DateTime::createFromFormat('Y-m-d', $value)->format('d/m/Y');
    } catch (Throwable $throwable) {
        // silence is gold
    }
    return '-';
}

/**
 * @param int|bool $value
 *
 * @return string
 */
function boolean($value): string
{
    return $value ? 'SIM' : 'NÃO';
}

/**
 * @param stdClass $info
 *
 * @return mixed
 */
function select(stdClass $info)
{
    $value = $info->value;
    if (!isset($info->options)) {
        return $value;
    }
    return array_reduce(
        $info->options,
        static function ($found, $option) use ($value) {
            if (isset($option->value) && $option->value === $value) {
                return $option->label;
            }

            return $found ?? $value;
        }
    );
}

function string(string $value): string
{
    $exploded = explode(',', $value);

    return array_reduce(
        $exploded,
        static function ($ant, $element) {
            $found = date($element);
            if ((strcmp($found, '-') === 0)) {
                return $element;
            }
            $valueReturned = $ant;
            if (!isset($valueReturned)) {
                $valueReturned = $found;
            }
            if (isset($ant)) {
                $valueReturned = $ant . ' a ' . $found;
            }
            return $valueReturned;
        },
    );
}
