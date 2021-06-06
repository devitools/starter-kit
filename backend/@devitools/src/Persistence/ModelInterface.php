<?php

declare(strict_types=1);

namespace Devitools\Persistence;

/**
 * Interface ModelInterface
 *
 * @package Devitools\Domains
 */
interface ModelInterface
{
    /**
     * Save the model to the database.
     *
     * @param array $options
     *
     * @return bool|mixed
     */
    public function save(array $options = []);

    /**
     * @return array
     */
    public function sorter(): array;

    /**
     * @param array [$names]
     *
     * @return array
     */
    public function getValues(?array $names = []): array;

    /**
     * @param string $name
     *
     * @return mixed
     */
    public function getValue(string $name);

    /**
     * @param string $name
     * @param mixed $value
     *
     * @return mixed
     */
    public function setValue(string $name, $value);

    /**
     * @param array $avoid
     *
     * @return array
     */
    public function except(array $avoid): array;

    /**
     * @param bool $detailed
     *
     * @return array
     */
    public function manyToOne(bool $detailed = false): array;

    /**
     * @param bool $detailed
     *
     * @return array
     */
    public function oneToMany(bool $detailed = false): array;

    /**
     * @param bool $detailed
     *
     * @return array
     */
    public function manyToMany(bool $detailed = false): array;

    /**
     * @return string
     */
    public function domain(): string;

    /**
     * @return array|string[]
     */
    public function getDefaults(): array;
}
