<?php

declare(strict_types=1);

namespace Devitools\Report\Where;

/**
 * Trait WhereEqual
 *
 * @package Devitools\Report\Where
 */
trait WhereEqual
{
    /**
     * @param array $filters
     * @param string $column
     * @param string $property
     *
     * @return $this
     */
    protected function addWhereEqual(array $filters, string $column, string $property = ''): self
    {
        if (!$property) {
            $property = $column;
        }
        $value = $filters[$property] ?? null;
        if (!$value) {
            return $this;
        }
        $this->where[] = "{$column} = :{$property}";
        return $this;
    }
}