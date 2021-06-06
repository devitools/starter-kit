<?php

declare(strict_types=1);

namespace Devitools\Persistence\Repository;

use Devitools\Persistence\AbstractModel;
use Devitools\Persistence\ModelInterface;

/**
 * Trait Read
 *
 * @package Devitools\Persistence\Repository
 * @property AbstractModel model
 */
trait Read
{
    /**
     * @param string $id
     * @param bool $trash
     *
     * @return ModelInterface
     */
    public function read(string $id, $trash = false): ?ModelInterface
    {
        $filters = $this->filterById($id);

        $query = $this->where($filters, $trash);

        $this->with($query);

        return $query
            ->get($this->model->columns())
            ->first();
    }
}
