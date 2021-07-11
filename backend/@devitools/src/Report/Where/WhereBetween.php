<?php

declare(strict_types=1);

namespace Devitools\Report\Where;

/**
 * Trait WhereBetween
 *
 * @package Devitools\Report\Where
 */
trait WhereBetween
{
    /**
     * @param array $filters
     * @param string $column
     * @param string $begin
     * @param string $end
     *
     * @return $this
     */
    protected function addWhereBetween(
        array $filters,
        string $column,
        string $begin = 'begin',
        string $end = 'end'
    ): self {
        $start = $filters[$begin] ?? null;
        $finish = $filters[$end] ?? null;

        if ($start && $finish) {
            $this->where[] = "{$column} BETWEEN :{$begin} AND :{$end}";
            return $this;
        }

        if ($start) {
            $this->where[] = "{$column} >= :{$begin}";
            return $this;
        }

        if ($finish) {
            $this->where[] = "{$column} >= :{$end}";
        }
        return $this;
    }

    /**
     * @param array $filters
     * @param string $column
     * @param string $property
     *
     * @return $this
     */
    protected function addWhereBetweenByRange(array &$filters, string $column, string $property = ''): self
    {
        if (!$property) {
            $property = $column;
        }
        $value = $filters[$property] ?? null;
        if (!$value) {
            return $this;
        }

        $dates = explode(',', $value);
        [$begin, $end] = $dates;
        $propertyBegin = "{$property}_begin";
        $propertyEnd = "{$property}_end";

        unset($filters[$property]);

        $filters[$propertyBegin] = $begin;
        $filters[$propertyEnd] = $end;

        $this->where[] = "{$column} between :{$propertyBegin} and :{$propertyEnd}";

        return $this;
    }
}
