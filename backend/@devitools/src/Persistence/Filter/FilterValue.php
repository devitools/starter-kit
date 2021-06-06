<?php

declare(strict_types=1);

namespace Devitools\Persistence\Filter;

/**
 * Class FilterValue
 *
 * @package Devitools\Persistence\Filter
 */
class FilterValue
{
    /**
     * @var string
     */
    private string $value;

    /**
     * @var string
     */
    private string $operator;

    /**
     * @var string
     */
    private string $connector;

    /**\
     * FilterValue constructor.
     *
     * @param string $value
     * @param string $operator
     * @param string $connector
     */
    private function __construct(string $value, string $operator, string $connector)
    {
        $this->value = $value;
        $this->operator = $operator;
        $this->connector = $connector;
    }

    /**
     * @param string|number $value
     * @param string $operator
     * @param string $connector
     *
     * @return static
     */
    public static function build($value, $operator = 'eq', $connector = Connectors::AND)
    {
        return new static((string)$value, $operator, $connector);
    }

    /**
     * @return string
     */
    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @return string
     */
    public function getOperator(): string
    {
        return $this->operator;
    }

    /**
     * @return string
     */
    public function getConnector(): string
    {
        return $this->connector;
    }
}