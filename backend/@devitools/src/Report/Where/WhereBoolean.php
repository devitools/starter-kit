<?php

declare(strict_types=1);

namespace Devitools\Report\Where;

/**
 * Trait WhereBoolean
 *
 * @package Devitools\Report\Where
 */
trait WhereBoolean
{
    /**
     * @param array $filters
     * @param string $column
     * @param string $property
     * @return $this
     */
    protected function addWhereBoolean(array &$filters, string $column, string $property = ''): self
    {
        if (!$property) {
            $property = $column;
        }

        $value = $filters[$property] ?? null;
        if ($value === null) {
            return $this;
        }

        unset($filters[$property]);

        if ($value === 'true' || $value === "1") {
            $this->where[] = "{$column} = 1";
            return $this;
        }

        $this->where[] = "({$column} = 0 or {$column} is null)";
        return $this;
    }
}
