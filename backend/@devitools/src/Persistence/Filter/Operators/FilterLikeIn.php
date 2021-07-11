<?php

declare(strict_types=1);

namespace Devitools\Persistence\Filter\Operators;

use Devitools\Persistence\Filter\FilterAbstract;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class FilterLikeIn
 *
 * @package Devitools\Persistence\Filter\Operators
 */
class FilterLikeIn extends FilterAbstract
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
        $pieces = explode(',', $value);
        if (count($pieces) === 1) {
            return $query->where($column, 'like', "%{$value}%");
        }
        return $query->where(function ($query) use ($column, $pieces) {
            foreach ($pieces as $piece) {
                $value = trim($piece);
                $query->orWhere($column, 'like', "%{$value}%");
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
        $pieces = explode(',', $value);
        if (count($pieces) === 1) {
            return $query->orWhere($column, 'like', "%{$value}%");
        }
        return $query->orWhere(function ($query) use ($column, $pieces) {
            foreach ($pieces as $piece) {
                $value = trim($piece);
                $query->orWhere($column, 'like', "%{$value}%");
            }
        });
    }
}
