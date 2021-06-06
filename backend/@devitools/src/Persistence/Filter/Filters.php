<?php

declare(strict_types=1);

namespace Devitools\Persistence\Filter;

use Devitools\Persistence\Filter\Operators\FilterBetween;
use Devitools\Persistence\Filter\Operators\FilterCurrency;
use Devitools\Persistence\Filter\Operators\FilterEqual;
use Devitools\Persistence\Filter\Operators\FilterIn;
use Devitools\Persistence\Filter\Operators\FilterLike;
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
    public const EQUAL = 'eq';

    /**
     * @var string
     */
    public const NOT_EQUAL = 'neq';

    /**
     * @var string
     */
    public const LIKE = 'like';

    /**
     * @var string
     */
    public const IN = 'in';

    /**
     * @var string
     */
    public const NIN = 'nin';

    /**
     * @var string
     */
    public const CURRENCY = 'currency';

    /**
     * @var string
     */
    public const BETWEEN = 'between';

    /**
     * @var string
     */
    public const MULTI_EQUAL = 'multi-eq';

    /**
     * @var string
     */
    public const MULTI_LIKE = 'multi-like';

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
            self::EQUAL => FilterEqual::class,
            self::NOT_EQUAL => FilterNotEqual::class,
            self::LIKE => FilterLike::class,
            self::IN => FilterIn::class,
            self::NIN => FilterNotIn::class,
            self::CURRENCY => FilterCurrency::class,
            self::BETWEEN => FilterBetween::class,
            self::MULTI_EQUAL => FilterMultiEqual::class,
            self::MULTI_LIKE => FilterMultiLike::class,
        ];

        if (!isset($operators[$operator])) {
            return null;
        }

        /** @var FilterInterface $reference */
        $reference = $operators[$operator];
        self::$filters[$operator] = $reference::get();

        return self::$filters[$operator];
    }
}
