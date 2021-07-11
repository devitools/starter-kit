<?php

declare(strict_types=1);

namespace Devitools\Agnostic;

use Devitools\Persistence\AbstractModel;
use Devitools\Units\Common\UserSession;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class Schema
 *
 * @package Devitools\Agnostic
 */
abstract class Schema extends AbstractModel
{
    /**
     * @trait
     */
    use UserSession;
    use Fields;
    use FieldIs;
    use Relation;
    use Hooks;
    use Events;
    use Validation;

    /**
     * @var string
     */
    public const PRIMARY_KEY = __BINARY_KEY__;

    /**
     * The resource associated with the schema.
     *
     * @return string
     */
    abstract public static function resource(): string;

    /**
     * The resource identifier of the schema
     *
     * @return array
     */
    public static function identifier(): array
    {
        return [static::resource(), static::PRIMARY_KEY];
    }

    /**
     * Build the schema fields and actions.
     *
     * @return void
     */
    abstract public function construct(): void;

    /**
     * Model constructor.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->schema();
    }

    /**
     * @return $this
     */
    public function schema(): self
    {
        $this->construct();
        $this->table = $this::resource();

        $this->primaryKey = static::PRIMARY_KEY;

        $fields = $this->getFields();
        foreach ($fields as $key => $field) {
            $this->configureField($key, $field);
        }
        return $this;
    }

    /**
     * @param string $key
     * @param object $field
     */
    private function configureField(string $key, object $field): void
    {
        if ($field->fill) {
            $this->fillable[] = $key;
        }

        if ($field->hidden) {
            $this->hidden[] = $key;
        }

        if ($field->unique) {
            $this->uniques[] = $key;
        }

        if ($field->currency) {
            $this->currencies[] = $key;
        }

        if ($field->cast) {
            $this->casts[$key] = $field->cast;
        }

        if ($field->calculated) {
            $this->calculated[$key] = $field->calculated;
        }

        if (count($field->rules)) {
            $this->rules[$key] = $field->rules;
        }

        if (is_array($field->avoid)) {
            $this->avoids[$key] = $field->avoid;
        }

        if (isset($field->manyToOne)) {
            $name = $field->manyToOne->name;
            $remote = $field->manyToOne->remote;
            $ownerKey = $field->manyToOne->ownerKey;
            $with = $field->manyToOne->with;
            $this->addManyToOne($name, $remote, $key, $ownerKey, $with);
        }

        if (isset($field->hasMany)) {
            $name = $field->hasMany->name;
            $remote = $field->hasMany->remote;
            $foreignKey = $field->hasMany->foreignKey;
            $setup = $field->hasMany->setup;
            $localKey = $field->hasMany->localKey;
            $with = $field->hasMany->with;
            $this->addOneToMany($name, $remote, $foreignKey, $setup, $localKey, $with);
        }
    }

    /**
     * @return Builder
     * @noinspection ReturnTypeCanBeDeclaredInspection
     * @noinspection PhpMissingReturnTypeInspection
     */
    public function newQuery()
    {
        $query = parent::newQuery();

        if (!$this->hasHook('query:default')) {
            return $query;
        }
        return $this->triggerHook('query:default', [$query]);
    }

    /**
     * @return array
     */
    public function currencies(): array
    {
        return $this->currencies;
    }

    /**
     * @return array
     */
    public function getDefaults(): array
    {
        $defaults = [];
        foreach ($this->fields as $field => $settings) {
            if (!isset($settings->value)) {
                continue;
            }
            $defaults[$field] = $settings->value;
        }
        return $defaults;
    }
}
