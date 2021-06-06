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
function valueNumber($row, string $property, int $precision = 2, $decimals = ',', $thousands = '.'): string
{
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
function valueSelect($row, string $property, array $options, $fallback = ' - '): string
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
 *
 * @return mixed
 */
function responsible($row, string $property)
{
    $regex = '/^(.*)\s\[.*\]/';
    $value = property($row, $property, ' - ');

    preg_match_all($regex, $value, $matches, PREG_SET_ORDER, 0);

    return $matches[0][1] ?? $value;
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
