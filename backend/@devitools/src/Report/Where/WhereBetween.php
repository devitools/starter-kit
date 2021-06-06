<?php

declare(strict_types=1);

namespace Devitools\Report\Where;

/**
 * Trait WhereBetween
 *
 * @package Devitools\Report\Where
 * @property array $where
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
        array &$filters,
        string $column,
        string $begin = 'begin',
        string $end = 'end'
    ): self {
        $start = $filters[$begin] ?? null;
        $finish = $filters[$end] ?? null;

        if (!$start && !$finish) {
            return $this;
        }

        if ($start && $finish) {
            $filters[$begin] = "{$start} 00:00:00";
            $filters[$end] = "{$finish} 23:59:59";
            $this->where[] = "{$column} BETWEEN :{$begin} AND :{$end}";
            return $this;
        }

        if ($start) {
            $filters[$begin] = "{$start} 00:00:00";
            $this->where[] = "{$column} >= :{$begin}";
            return $this;
        }

        if ($finish) {
            $filters[$end] = "{$finish} 23:59:59";
            $this->where[] = "{$column} <= :{$end}";
        }
        return $this;
    }
}
