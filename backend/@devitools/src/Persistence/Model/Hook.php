<?php

declare(strict_types=1);

namespace Devitools\Persistence\Model;

use Devitools\Exceptions\ErrorInvalidArgument;
use Devitools\Exceptions\ErrorValidation;
use Devitools\Persistence\AbstractModel;
use Devitools\Persistence\AbstractRepository;
use Devitools\Persistence\RepositoryInterface;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

use function Devitools\Helper\counter;
use function is_array;
use function PhpBrasil\Collection\pack;

/**
 * Trait Configure
 *
 * @package Devitools\Persistence\Model
 */
trait Hook
{
    /**
     * @return void
     * @throws ErrorInvalidArgument
     * @throws ErrorValidation
     */
    public static function boot(): void
    {
        parent::boot();

        static::configure();

        static::creating(static function (AbstractModel $model) {
            // generate counter
            $model->counter();
            // generate responsible info to create operation
            $model->responsibleCreate();
        });

        static::updating(static function (AbstractModel $model) {
            // generate responsible info to update operation
            $model->responsibleUpdate();
        });

        static::deleting(static function (AbstractModel $model) {
            // generate responsible info to delete operation
            $model->responsibleDelete();
        });

        static::saving(static function (AbstractModel $model) {
            $model->prepare();
            // parse many to one relationship
            $model->persistManyToOne();
            // validate the values
            $model->validate();
        });

        static::saved(static function (AbstractModel $model) {
            // parse many to many relationship
            $model->persistManyToMany();
            // parse one to many relationship
            $model->persistOneToMany();
        });
    }

    /**
     * @return void
     */
    protected function persistManyToMany(): void
    {
        $manyToMany = $this->manyToMany();
        foreach ($manyToMany as $alias => $column) {
            $items = $this->getFilled($alias);
            if (!is_array($items)) {
                return;
            }

            $ids = pack($items)
                ->map(function ($action) {
                    return static::encodeUuid($action[$this->exposedKey()]);
                })
                ->records();
            $this->{$alias}()->sync($ids);
        }
    }

    /**
     * @return void
     */
    protected function persistOneToMany(): void
    {
        $oneToMany = $this->oneToMany();
        foreach ($oneToMany as $alias => $parser) {
            if ($parser === null) {
                continue;
            }

            $items = $this->getFilled($alias);
            if (!is_array($items)) {
                continue;
            }

            $this->persistOneToManyItems($alias, $parser, $items);
        }
    }

    /**
     * @param string $alias
     * @param mixed $parser
     * @param array $items
     */
    protected function persistOneToManyItems(string $alias, $parser, array $items): void
    {
        /** @var HasMany $hasMany */
        $hasMany = $this->{$alias}();

        $localKey = $hasMany->getLocalKeyName();
        $foreignKey = $hasMany->getForeignKeyName();

        // TODO: apply sync on everywhere

        $delete = function () use ($hasMany, $localKey, $foreignKey) {
            $previous = $hasMany->where($foreignKey, $this->getValue($localKey))->get();
            foreach ($previous as $record) {
                $record->forceDelete();
            }
        };

        if (is_callable($parser)) {
            $delete();
            $values = pack($items)->map(function ($data) use ($parser, $foreignKey, $localKey) {
                $uuid = Uuid::uuid4();
                $value = [
                    __BINARY_KEY__ => $uuid->getBytes(),
                    __PRIMARY_KEY__ => $uuid->toString(),
                    $foreignKey => $this->getValue($localKey),
                ];
                if (config('app.counter')) {
                    $value['counter'] = counter();
                }
                return array_merge($value, $parser($data, $foreignKey, $localKey));
            });
            $hasMany->insert($values->records());
            return;
        }

        if (is_array($parser) && isset($parser['reference'])) {
            $delete();
            /** @var AbstractRepository $reference */
            $reference = $parser['reference'];
            /** @var RepositoryInterface $repository */
            $repository = $reference::instance();
            foreach ($items as $item) {
                $item[$foreignKey] = $this->getValue($localKey);
                $repository->create($item);
            }
            return;
        }

        if (is_string($parser)) {
            $delete();
            /** @var AbstractRepository $parser */
            /** @var RepositoryInterface $repository */
            $repository = $parser::instance();
            foreach ($items as $item) {
                $item[$foreignKey] = $this->getValue($localKey);
                $repository->create($item);
            }
            return;
        }

        /** @noinspection PhpUndefinedFieldInspection */
        $related = $this->hasMany[$alias]->related;
        if (!class_exists($related)) {
            return;
        }
        $this->persistSynchronizeOneToManyItem($hasMany, $related, $items);
    }

    /**
     * @param HasMany $hasMany
     * @param mixed $related
     * @param array $items
     */
    protected function persistSynchronizeOneToManyItem(HasMany $hasMany, $related, array $items): void
    {
        $localKey = $hasMany->getLocalKeyName();
        $foreignKey = $hasMany->getForeignKeyName();
        /** @var AbstractModel $related */
        $primaryKey = $related::getExternalKey();

        $children = $hasMany
            ->where($foreignKey, $this->getValue($localKey))
            ->get()
            ->reduce(static function ($accumulator, AbstractModel $model) {
                $accumulator[$model->getPrimaryKeyValue()] = true;
                return $accumulator;
            }, []);

        $instance = static function ($primaryKeyValue) use ($related) {
            if (!$primaryKeyValue) {
                return new $related();
            }
            return (new $related())->find($primaryKeyValue);
        };

        foreach ($items as $item) {
            $primaryKeyValue = null;
            if (isset($item[$primaryKey])) {
                $primaryKeyValue = (string)$item[$primaryKey];
                unset($children[$primaryKeyValue]);
            }
            /** @var AbstractModel $model */
            $model = $instance($primaryKeyValue);
            if (!$model) {
                continue;
            }

            $item[$foreignKey] = $this->getValue($localKey);
            $model->fill($item);
            $model->save();
        }

        $previous = $hasMany
            ->where($foreignKey, $this->getValue($localKey))
            ->whereIn($primaryKey, array_keys($children))
            ->get();
        foreach ($previous as $record) {
            $record->forceDelete();
        }
    }

    /**
     * @return void
     * @throws ErrorInvalidArgument
     */
    protected function persistManyToOne(): void
    {
        $manyToOne = $this->manyToOne();
        foreach ($manyToOne as $alias => $column) {
            $filled = $this->getFilled($alias);
            if ($filled === __UNDEFINED__) {
                continue;
            }
            if ($filled === null) {
                $this->setValue($column, null);
                continue;
            }
            if (!is_array($filled)) {
                continue;
            }
            $this->persistManyToOneArray($column, $filled);
        }
    }

    /**
     * @param string $column
     * @param array $filled
     *
     * @return void
     * @throws ErrorInvalidArgument
     */
    private function persistManyToOneArray(string $column, array $filled): void
    {
        if (!isset($filled[$this->exposedKey()])) {
            throw new ErrorInvalidArgument(["{$column}.{$this->exposedKey()}" => 'required']);
        }
        $id = $filled[$this->exposedKey()];
        $value = Uuid::fromString($id)->getBytes();
        $this->setValue($column, $value);
    }
}
