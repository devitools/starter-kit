<?php

declare(strict_types=1);

namespace Devitools\Persistence\Filter;

use Devitools\Persistence\Filter\Operators\FilterBetween;
use Devitools\Persistence\Filter\Operators\FilterCurrency;
use Devitools\Persistence\Filter\Operators\FilterDate;
use Devitools\Persistence\Filter\Operators\FilterEqual;
use Devitools\Persistence\Filter\Operators\FilterIn;
use Devitools\Persistence\Filter\Operators\FilterLike;
use Devitools\Persistence\Filter\Operators\FilterLikeIn;
use Devitools\Persistence\Filter\Operators\FilterMultiEqual;
use Devitools\Persistence\Filter\Operators\FilterMultiLike;
use Devitools\Persistence\Filter\Operators\FilterNotEqual;
use Devitools\Persistence\Filter\Operators\FilterNotIn;

/**
 * Class Filters
 *
 * @package Devitools\Persistence\Filter
 */
final class Filters
{
    /**
     * @var string
     */
    public const SEPARATION_OPERATOR = '~.~';

    /**
     * @var string
     */
    public const BETWEEN = 'between';

    /**
     * @var string
     */
    public const CURRENCY = 'currency';

    /**
     * @var string
     */
    public const DATE = 'date';

    /**
     * @var string
     */
    public const EQUAL = 'eq';

    /**
     * @var string
     */
    public const IN = 'in';

    /**
     * @var string
     */
    public const LIKE = 'like';

    /**
     * @var string
     */
    public const LIKE_IN = 'like-in';

    /**
     * @var string
     */
    public const MULTI_EQUAL = 'multi-eq';

    /**
     * @var string
     */
    public const MULTI_LIKE = 'multi-like';

    /**
     * @var string
     */
    public const NOT_EQUAL = 'neq';

    /**
     * @var string
     */
    public const NOT_IN = 'nin';

    /**
     * @var array
     */
    private static array $filters = [];

    /**
     * Filters constructor.
     */
    private function __construct()
    {
    }

    /**
     * @param string $operator
     *
     * @return FilterInterface|null
     */
    public static function filter(string $operator): ?FilterInterface
    {
        if (isset(self::$filters[$operator])) {
            return self::$filters[$operator];
        }

        $operators = [
            self::BETWEEN => FilterBetween::class,
            self::CURRENCY => FilterCurrency::class,
            self::DATE => FilterDate::class,
            self::EQUAL => FilterEqual::class,
            self::IN => FilterIn::class,
            self::LIKE => FilterLike::class,
            self::LIKE_IN => FilterLikeIn::class,
            self::MULTI_EQUAL => FilterMultiEqual::class,
            self::MULTI_LIKE => FilterMultiLike::class,
            self::NOT_EQUAL => FilterNotEqual::class,
            self::NOT_IN => FilterNotIn::class,
        ];

        if (!isset($operators[$operator])) {
            return null;
        }

        /** @var FilterInterface $reference */
        $reference = $operators[$operator];
        self::$filters[$operator] = $reference::get();

        return self::$filters[$operator];
    }

    /**
     * @param string $value
     * @param string $filter
     *
     * @return string
     */
    public static function filterAs(string $value, string $filter): string
    {
        $separator = self::SEPARATION_OPERATOR;
        return "{$filter}{$separator}{$value}";
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterBetween(string $value): string
    {
        return self::filterAs($value, self::BETWEEN);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterCurrency(string $value): string
    {
        return self::filterAs($value, self::CURRENCY);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterDate(string $value): string
    {
        return self::filterAs($value, self::DATE);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterEqual(string $value): string
    {
        return self::filterAs($value, self::EQUAL);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterIn(string $value): string
    {
        return self::filterAs($value, self::IN);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterLike(string $value): string
    {
        return self::filterAs($value, self::LIKE);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterLikeIn(string $value): string
    {
        return self::filterAs($value, self::LIKE_IN);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterMultiEqual(string $value): string
    {
        return self::filterAs($value, self::MULTI_EQUAL);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterMultiLike(string $value): string
    {
        return self::filterAs($value, self::MULTI_LIKE);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterNotEqual(string $value): string
    {
        return self::filterAs($value, self::NOT_EQUAL);
    }

    /**
     * @param string $value
     *
     * @return string
     */
    public static function filterNotIn(string $value): string
    {
        return self::filterAs($value, self::NOT_IN);
    }
}
