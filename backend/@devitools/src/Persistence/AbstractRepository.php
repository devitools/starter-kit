<?php

declare(strict_types=1);

namespace Devitools\Persistence;

use Devitools\Persistence\Repository\Basic;
use Devitools\Persistence\Repository\Count;
use Devitools\Persistence\Repository\Create;
use Devitools\Persistence\Repository\Destroy;
use Devitools\Persistence\Repository\Helper;
use Devitools\Persistence\Repository\Prepare;
use Devitools\Persistence\Repository\Read;
use Devitools\Persistence\Repository\Restore;
use Devitools\Persistence\Repository\Search;
use Devitools\Persistence\Repository\Update;
use Devitools\Units\Common\Instance;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Database\Eloquent\Builder;

use function is_array;
use function is_callable;
use function is_object;
use function is_string;

/**
 * Class AbstractRepository
 *
 * @package Simples
 */
abstract class AbstractRepository implements RepositoryInterface
{
    /**
     * Helpers
     */
    use Helper;
    use Instance;

    /**
     * Support
     */
    use Basic;
    use Prepare;
    use Count;

    /**
     * Basic operations
     */
    use Create;
    use Read;
    use Update;
    use Destroy;

    /**
     * Extra operations
     */
    use Restore;
    use Search;

    /**
     * @var AbstractModel|ModelInterface|Application|mixed
     */
    protected ModelInterface $model;

    /**
     * @var string
     */
    protected string $prototype;

    /**
     * PHP 5 allows developers to declare constructor methods for classes.
     * Classes which have a constructor method call this method on each newly-created object,
     * so it is suitable for any initialization that the object may need before it is used.
     * Note: Parent constructors are not called implicitly if the child class defines a constructor.
     * In order to run a parent constructor, a call to parent::__construct() within the child constructor is required.
     * param [ mixed $args [, $... ]]
     *
     * @link http://php.net/manual/en/language.oop5.decon.php
     *
     * @param ModelInterface|null $model
     */
    public function __construct(?ModelInterface $model = null)
    {
        if ($model) {
            $this->model = $model;
            return;
        }
        if (!isset($this->prototype)) {
            return;
        }
        $this->model = app($this->prototype);
    }

    /**
     * @return array
     */
    public function getFilterable(): array
    {
        return [];
    }

    /**
     * @return array
     */
    public function getDownloadable(): array
    {
        return [];
    }

    /**
     * @return array
     */
    public function getManyToOne(): array
    {
        return $this->model->manyToOne();
    }

    /**
     * @return Builder
     */
    public function query(): Builder
    {
        return $this->model->newQuery();
    }

    /**
     * @return array|string[]
     */
    public function getDefaults(): array
    {
        return $this->model->getDefaults();
    }

    /**
     * @return string
     */
    public function getPrototype(): string
    {
        return $this->prototype;
    }

    /**
     * @param Builder $query
     */
    protected function with(Builder $query): void
    {
        $manyToOne = $this->model->manyToOne(true);
        $with = [];
        foreach ($manyToOne as $relation => $settings) {
            $with[] = $relation;
            if (!is_object($settings)) {
                continue;
            }
            if (!is_array($settings->with)) {
                continue;
            }
            array_push($with, ...$settings->with);
        }

        $oneToMany = $this->model->oneToMany(true);
        foreach ($oneToMany as $relation => $settings) {
            $with[] = $relation;
            if (is_callable($settings)) {
                continue;
            }
            if (!is_object($settings)) {
                continue;
            }
            $setup = $settings->setup;
            if (is_array($setup) && isset($setup['with']) && is_string($setup['with'])) {
                $with[] = $setup['with'];
            }

            if (!is_array($settings->with)) {
                continue;
            }
            array_push($with, ...$settings->with);
        }

        $manyToMany = $this->model->manyToMany();
        foreach (array_keys($manyToMany) as $relation) {
            $query = $query->with($relation);
        }

        foreach ($with as $relation) {
            $query = $query->with($relation);
        }
    }
}
