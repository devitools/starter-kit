<?php

declare(strict_types=1);

namespace Source\Domains\Admin\User;

use Devitools\Persistence\Filter\FilterAbstract;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class UserFilterReference
 *
 * @package Source\Domains\Admin\User
 */
class UserFilterReference extends FilterAbstract
{
    /**
     * @param Builder $query
     * @param string $connector
     * @param string $value
     * @param string $column
     *
     * @return Builder
     */
    public function where(Builder $query, string $connector, string $value, string $column): Builder
    {
        return $query->whereHas('profile', static function (Builder $query) use ($value) {
            $query->where('reference', '=', $value);
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
    public function orWhere(Builder $query, string $connector, string $value, string $column): Builder
    {
        return $query->orwhereHas('profile', static function (Builder $query) use ($value) {
            $query->where('reference', '=', $value);
        });
    }
}
