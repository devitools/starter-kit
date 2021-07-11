<?php

declare(strict_types=1);

namespace Devitools\Persistence\Filter;

use Illuminate\Database\Eloquent\Builder;

/**
 * Interface Query
 *
 * @package Devitools\Persistence\Filter
 */
interface FilterInterface
{
    /**
     * @return FilterInterface
     */
    public static function get(): self;

    /**
     * @param Builder $query
     * @param string $connector
     * @param string $value
     * @param string $column
     *
     * @return Builder
     */
    public function orWhere(Builder $query, string $value, string $column, string $connector): Builder;

    /**
     * @param Builder $query
     * @param string $connector
     * @param string $value
     * @param string $column
     *
     * @return Builder
     */
    public function where(Builder $query, string $value, string $column, string $connector): Builder;

    /**
     * @param Builder $query
     * @param string $connector
     * @param string $value
     * @param string $column
     *
     * @return Builder
     */
    public function query(Builder $query, string $value, string $column, string $connector): Builder;
}
