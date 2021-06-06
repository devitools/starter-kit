<?php

namespace Devitools\Agnostic;

use Devitools\Persistence\Model\AssignContexts;

/**
 * Trait Fields
 *
 * @package Devitools\Agnostic
 */
trait Fields
{
    /**
     * Store the fields schema
     *
     * @var array
     */
    protected array $fields = [];

    /**
     * The name of the current field
     *
     * @var string
     */
    protected string $currentField = '';

    /**
     * Add a field on schema
     *
     * @param string $key
     * @param array $properties
     *
     * @return $this
     */
    protected function addField(string $key, array $properties = []): self
    {
        $this->currentField = $key;
        $defaults = [
            'key' => $key,
            'type' => 'string',
            'rules' => [],
            'scopes' => [],
            'cast' => null,
            'fill' => true,
            'unique' => false,
            'currency' => false,
            'hidden' => false,
            'avoid' => null,
            'value' => null,
            'calculated' => null,
        ];
        $this->fields[$key] = (object)array_merge($defaults, $properties);
        return $this;
    }

    /**
     * @param bool $unique
     *
     * @return $this
     */
    protected function unique(bool $unique = true): self
    {
        $this->fields[$this->currentField]->unique = $unique;
        return $this;
    }

    /**
     * @param bool $hidden
     *
     * @return $this
     */
    protected function hidden(bool $hidden = true): self
    {
        $this->fields[$this->currentField]->hidden = $hidden;
        return $this;
    }

    /**
     * Allow fill the field in mass assignment
     *
     * @param bool|null $fill
     *
     * @return $this
     */
    protected function massAssignment(bool $fill = true): self
    {
        $this->fields[$this->currentField]->fill = $fill;
        return $this;
    }

    /**
     * Allow fill the field in mass assignment
     *
     * @param string|string[] $context
     *
     * @return $this
     */
    protected function avoid($context = 'all'): self
    {
        $avoid = $context;
        if ($context === 'all') {
            $avoid = [AssignContexts::CREATE, AssignContexts::UPDATE];
        }
        if (!is_array($avoid)) {
            $avoid = [$avoid];
        }
        $this->fields[$this->currentField]->avoid = $avoid;
        return $this;
    }

    /**
     * @param $value
     *
     * @return $this
     */
    protected function defaultValue($value): self
    {
        $this->fields[$this->currentField]->value = $value;
        return $this;
    }

    /**
     * Configure the cast
     * Supported casts: [
     *     'integer',
     *     'real',
     *     'float',
     *     'double',
     *     'decimal:<digits>',
     *     'string',
     *     'boolean',
     *     'object',
     *     'array',
     *     'collection',
     *     'date',
     *     'datetime',
     *     'timestamp',
     * ]
     *
     * @param string $cast
     *
     * @return $this
     */
    protected function castAs(string $cast): self
    {
        $this->fields[$this->currentField]->cast = $cast;
        return $this;
    }

    /**
     * Get the fields of the schema
     *
     * @return array
     */
    public function getFields(): array
    {
        return $this->fields;
    }
}
