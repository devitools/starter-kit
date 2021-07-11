<?php

declare(strict_types=1);

namespace Devitools\Agnostic;

use Devitools\Persistence\AbstractModel;
use Devitools\Persistence\AbstractRepository;

use function PhpBrasil\Collection\pack;

/**
 * Trait FieldIs
 *
 * @package Devitools\Agnostic
 */
trait FieldIs
{
    /**
     * @return $this
     */
    protected function isBoolean(): self
    {
        $this->fields[$this->currentField]->type = 'boolean';
        $this->fields[$this->currentField]->cast = 'boolean';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isInput(): self
    {
        $this->fields[$this->currentField]->type = 'string';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isNumber(): self
    {
        $this->fields[$this->currentField]->type = 'number';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isPassword(): self
    {
        $this->fields[$this->currentField]->type = 'password';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isEmail(): self
    {
        $this->fields[$this->currentField]->type = 'email';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isText(): self
    {
        $this->fields[$this->currentField]->type = 'text';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isCheckbox(): self
    {
        return $this->isBoolean();
    }

    /**
     * @return $this
     */
    protected function isRadio(): self
    {
        $this->fields[$this->currentField]->type = 'options';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isSelect(): self
    {
        $this->fields[$this->currentField]->type = 'options';
        return $this;
    }

    /**
     * @param string $remote
     * @param string $exposed
     * @param string|null $ownerKey
     *
     * @return $this
     */
    protected function isSelectRemote(string $remote, string $exposed, string $ownerKey = null): self
    {
        $this->fields[$this->currentField]->type = 'string';
        $this->fields[$this->currentField]->manyToOne = (object)[
            'name' => $exposed,
            'remote' => $remote,
            'ownerKey' => $ownerKey ?? __BINARY_KEY__,
            'with' => [],
        ];
        return $this;
    }

    /**
     * @return $this
     */
    protected function isSelectRemoteMultiple(): self
    {
        $this->fields[$this->currentField]->type = 'hasMany';
        return $this;
    }

    /**
     * @param string $instruction
     *
     * @return $this
     */
    protected function isCalculated(string $instruction): self
    {
        $this->fields[$this->currentField]->calculated = $instruction;
        return $this;
    }

    /**
     * @param string $exposed
     *
     * @return AbstractModel|null
     */
    public function remote(string $exposed): ?AbstractModel
    {
        $collection = $this->$exposed();
        if ($collection) {
            return $collection->first();
        }
        return null;
    }

    /**
     * @param string $exposed
     * @param string $name
     * @param mixed $fallback
     *
     * @return mixed|null
     */
    public function remoteValue(string $exposed, string $name, $fallback = null)
    {
        $model = $this->remote($exposed);
        if (!$model) {
            return $fallback;
        }
        return $model->getValue($name);
    }

    /**
     * @return $this
     */
    protected function isToggle(): self
    {
        return $this->isBoolean();
    }

    /**
     * @return $this
     */
    protected function isDate(): self
    {
        $this->fields[$this->currentField]->type = 'date';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isDatetime(): self
    {
        $this->fields[$this->currentField]->type = 'datetime';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isInputPlan(): self
    {
        $this->fields[$this->currentField]->type = 'string';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isUrl(): self
    {
        $this->fields[$this->currentField]->type = 'url';
        return $this;
    }

    /**
     * @param string $remote
     * @param string $foreignKey
     * @param callable|string|null $setup
     * @param string|null $localKey
     *
     * @return $this
     */
    protected function isArray(string $remote, string $foreignKey, $setup = null, string $localKey = null): self
    {
        $this->fields[$this->currentField]->type = 'hasMany';
        $this->fields[$this->currentField]->hasMany = (object)[
            'name' => $this->currentField,
            'remote' => $remote,
            'foreignKey' => $foreignKey,
            'setup' => $setup,
            'localKey' => $localKey ?? $this->primaryKey,
            'with' => [],
        ];
        $this->fields[$this->currentField]->fill = false;
        return $this;
    }

    /**
     * @param string $foreignKey
     * @param string $repository
     * @param string|null $localKey
     *
     * @return $this
     */
    protected function isBuiltin(string $repository, string $foreignKey, string $localKey = null): self
    {
        /** @var AbstractRepository $repository */
        $remote = $repository::instance()->getPrototype();
        $this->isArray($remote, $foreignKey, $repository, $localKey);
        return $this;
    }

    /**
     * @param string $remote
     * @param string $foreignKey
     * @param string|callable $callable
     * @param string|null $localKey
     *
     * @return $this
     */
    protected function isTree(string $remote, string $foreignKey, $callable, string $localKey = null): self
    {
        $this->isArray($remote, $foreignKey, $callable, $localKey);
        return $this;
    }

    /**
     * @return $this
     */
    protected function isCurrency(): self
    {
        $this->fields[$this->currentField]->type = 'currency';
        $this->fields[$this->currentField]->currency = true;
        return $this;
    }

    /**
     * @return $this
     */
    protected function isImage(): self
    {
        $this->fields[$this->currentField]->type = 'image';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isFile(): self
    {
        $this->fields[$this->currentField]->type = 'file';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isFileSync(): self
    {
        $this->fields[$this->currentField]->type = 'file';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isInternationalPhone(): self
    {
        $this->fields[$this->currentField]->type = 'string';
        return $this;
    }

    /**
     * @return $this
     */
    protected function isJSON(): self
    {
        $this->fields[$this->currentField]->type = 'json';
        return $this;
    }

    /**
     * @param array $properties
     *
     * @return $this
     */
    protected function withNested(array $properties): self
    {
        if (isset($this->fields[$this->currentField]->manyToOne)) {
            $name = $this->fields[$this->currentField]->manyToOne->name;
            $with = pack($properties)
                ->map(static function ($property) use ($name) {
                    return "{$name}.{$property}";
                })
                ->records();
            $this->fields[$this->currentField]->manyToOne->with = $with;
        }

        if (isset($this->fields[$this->currentField]->hasMany)) {
            $name = $this->fields[$this->currentField]->hasMany->name;
            $with = pack($properties)
                ->map(static function ($property) use ($name) {
                    return "{$name}.{$property}";
                })
                ->records();
            $this->fields[$this->currentField]->hasMany->with = $with;
        }

        return $this;
    }
}
