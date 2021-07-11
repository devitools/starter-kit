<?php

declare(strict_types=1);

namespace Devitools\Persistence\Repository;

use Devitools\Persistence\AbstractModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

use function is_array;

/**
 * Trait Search
 *
 * @package Devitools\Persistence\Repository
 * @property AbstractModel model
 */
trait Search
{
    /**
     * @param array $options
     * @param bool $trash
     *
     * @return array
     */
    public function search(array $options = [], $trash = false): array
    {
        $filters = $options['filters'] ?? [];
        $offset = $options['offset'] ?? 0;
        $limit = $options['limit'] ?? 25;
        $sorter = $options['sorter'] ?? null;

        if (!is_array($sorter)) {
            $sorter = $this->model->sorter();
        }

        return $this->find($filters, $sorter, $offset, $limit, $trash)->toArray();
    }

    /**
     * @param array $filters
     * @param array $sorter
     * @param int $offset
     * @param int $limit
     * @param bool $trash
     *
     * @return AbstractModel[]|Builder[]|Collection
     */
    public function find(array $filters, $sorter = [], $offset = 0, $limit = 25, $trash = false)
    {
        /** @var AbstractModel $query */
        $query = $this->where($filters, $trash);

        return $this->queryFind($query, $sorter, $offset, $limit);
    }

    /**
     * @param AbstractModel|Builder $query
     * @param array $sorter
     * @param int $offset
     * @param int $limit
     *
     * @return Builder[]|Collection
     */
    protected function queryFind($query, $sorter = [], $offset = 0, $limit = 0)
    {
        $manyToOne = $this->model->manyToOne();
        foreach (array_keys($manyToOne) as $related) {
            /** @var Builder $query */
            $query = $query->with($related);
        }

        foreach ($sorter as $column => $direction) {
            /** @noinspection CallableParameterUseCaseInTypeContextInspection */
            $query = $query->orderBy($column, $direction);
        }

        if ($limit === 0) {
            return $query->get($this->model->columns());
        }

        return $query
            ->offset($offset)
            ->limit($limit)
            ->get($this->model->columns());
    }
}
