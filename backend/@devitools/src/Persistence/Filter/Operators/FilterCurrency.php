<?php

declare(strict_types=1);

namespace Devitools\Persistence\Filter\Operators;

use Devitools\Persistence\Filter\FilterAbstract;
use Illuminate\Database\Eloquent\Builder;

use function Devitools\Helper\numberToCurrency;

/**
 * Class FilterCurrency
 *
 * @package Devitools\Persistence\Filter\Filters
 */
class FilterCurrency extends FilterAbstract
{
    /**
     * @param Builder $query
     * @param string $value
     * @param string $column
     * @param string $connector
     *
     * @return Builder
     */
    public function where(Builder $query, string $value, string $column, string $connector): Builder
    {
        return $query->where($column, '=', numberToCurrency($value));
    }

    /**
     * @param Builder $query
     * @param string $value
     * @param string $column
     * @param string $connector
     *
     * @return Builder
     */
    public function orWhere(Builder $query, string $value, string $column, string $connector): Builder
    {
        return $query->orWhere($column, '=', numberToCurrency($value));
    }
}
