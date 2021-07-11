<?php

declare(strict_types=1);

namespace Devitools\Agnostic;

/**
 * Trait Relation
 *
 * @package Devitools\Agnostic
 */
trait Relation
{
    /**
     * @var array
     */
    protected array $belongsTo = [];

    /**
     * @var array
     */
    protected array $hasMany = [];

    /**
     * @var array
     */
    protected array $withRelations = [];

    /**
     * @param string $name
     * @param string $related
     * @param string $foreignKey
     * @param string $ownerKey
     * @param array $with
     *
     * @return $this
     */
    protected function addManyToOne(
        string $name,
        string $related,
        string $foreignKey,
        string $ownerKey,
        array $with = []
    ): self {
        // $this->manyToOne[$name] = $foreignKey;
        $this->belongsTo[$name] = (object)[
            'foreignKey' => $foreignKey,
            'related' => $related,
            'ownerKey' => $ownerKey,
            'name' => $name,
            'with' => $with,
        ];
        return $this;
    }

    /**
     * @param string $name
     * @param string $related
     * @param string $foreignKey
     * @param string|callable|null $setup
     * @param string|null $localKey
     * @param array $with
     *
     * @return $this
     */
    protected function addOneToMany(
        string $name,
        string $related,
        string $foreignKey,
        $setup,
        string $localKey,
        array $with = []
    ): self {
        // $this->oneToMany[$name] = $callable;
        $this->hasMany[$name] = (object)[
            'setup' => $setup,
            'related' => $related,
            'foreignKey' => $foreignKey,
            'localKey' => $localKey,
            'with' => $with,
        ];
        return $this;
    }

    /**
     * @param bool $detailed
     *
     * @return array
     */
    public function manyToOne(bool $detailed = false): array
    {
        if ($detailed) {
            return $this->belongsTo;
        }
        $manyToOne = [];
        foreach ($this->belongsTo as $name => $belongsTo) {
            $manyToOne[$name] = $belongsTo->foreignKey;
        }
        return $manyToOne;
    }

    /**
     * @param bool $detailed
     *
     * @return array
     */
    public function oneToMany(bool $detailed = false): array
    {
        if ($detailed) {
            return $this->hasMany;
        }

        $oneToMany = [];
        foreach ($this->hasMany as $name => $hasMany) {
            $oneToMany[$name] = $hasMany->setup;
        }
        return $oneToMany;
    }

    /**
     * @param string $name
     *
     * @return mixed
     * @noinspection MagicMethodsValidityInspection
     * @noinspection PhpUndefinedMethodInspection
     */
    public function __get($name)
    {
        if (isset($this->belongsTo[$name])) {
            $belongsTo = $this->belongsTo[$name];
            return $this
                ->belongsTo($belongsTo->related, $belongsTo->foreignKey, $belongsTo->ownerKey, $belongsTo->name)
                ->withTrashed()
                ->get();
        }

        if (isset($this->hasMany[$name])) {
            $hasMany = $this->hasMany[$name];
            return $this
                ->hasMany($hasMany->related, $hasMany->foreignKey, $hasMany->localKey)
                ->withTrashed()
                ->get();
        }

        return parent::__get($name);
    }

    /**
     * @param string $name
     * @param array $arguments
     *
     * @return mixed
     * @noinspection PhpUndefinedMethodInspection
     */
    public function __call($name, $arguments)
    {
        if (isset($this->belongsTo[$name])) {
            $belongsTo = $this->belongsTo[$name];
            $related = $belongsTo->related;
            $foreignKey = $belongsTo->foreignKey;
            $ownerKey = $belongsTo->ownerKey;
            $relation = $belongsTo->name;
            return $this->belongsTo($related, $foreignKey, $ownerKey, $relation)
                ->withTrashed();
        }

        if (isset($this->hasMany[$name])) {
            $hasMany = $this->hasMany[$name];
            $related = $hasMany->related;
            $foreignKey = $hasMany->foreignKey;
            $localKey = $hasMany->localKey;
            return $this->hasMany($related, $foreignKey, $localKey)->withTrashed();
        }

        return parent::__call($name, $arguments);
    }
}
