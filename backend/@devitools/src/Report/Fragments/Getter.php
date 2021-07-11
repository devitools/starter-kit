<?php

declare(strict_types=1);

namespace Devitools\Report\Fragments;

/**
 * Trait Getters
 *
 * @package Devitools\Report\Fragments
 */
trait Getter
{
    /**
     * @var string
     */
    protected string $user;

    /**
     * @var string
     */
    protected string $title = '';

    /**
     * @var array
     */
    protected array $filters;

    /**
     * @var array
     */
    protected array $where = [];

    /**
     * @var array
     */
    protected array $collection;

    /**
     * @return string
     */
    public function getUser(): string
    {
        return $this->user;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @return array
     */
    public function getFilters(): array
    {
        return $this->filters;
    }

    /**
     * @return array
     */
    public function getCollection(): array
    {
        return $this->collection;
    }
}
