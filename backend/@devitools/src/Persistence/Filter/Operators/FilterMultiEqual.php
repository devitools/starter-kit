<?php

declare(strict_types=1);

namespace Devitools\Persistence\Filter\Operators;

use Devitools\Persistence\Filter\FilterAbstract;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class FilterEqual
 *
 * @package Devitools\Persistence\Filter\Filters
 */
class FilterMultiEqual extends FilterAbstract
{
    /**
     * @param Builder $query
     * @param string $connector
     * @param string $value
     * @param string $column
     *
     * @return Builder
     */
    public function where(Builder $query, string $value, string $column, string $connector): Builder
    {
        $pieces = explode(' ', $value);
        if (count($pieces) === 1) {
            return $query->where($column, '=', $value);
        }
        return $query->where(function ($query) use ($column, $pieces) {
            foreach ($pieces as $value) {
                $query->where($column, '=', $value);
            }
        });
    }

    /**
     * @param Builder $query
     * @param string $connector
     * @param string $value
     * @param string $column
     *
     * @return Builder
     */
    public function orWhere(Builder $query, string $value, string $column, string $connector): Builder
    {
        $pieces = explode(' ', $value);
        if (count($pieces) === 1) {
            return $query->orWhere($column, '=', $value);
        }
        return $query->orWhere(function ($query) use ($column, $pieces) {
            foreach ($pieces as $value) {
                $query->orWhere($column, '=', $value);
            }
        });
    }
}
