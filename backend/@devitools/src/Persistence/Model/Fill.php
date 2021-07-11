<?php

declare(strict_types=1);

namespace Devitools\Persistence\Model;

use Devitools\Persistence\AbstractModel;
use Php\JSON;

use function count;
use function in_array;
use function PhpBrasil\Collection\pack as vector;

/**
 * Trait Fill
 *
 * @package Devitools\Persistence\Model
 */
trait Fill
{
    /**
     * @var array
     */
    protected $filled = [];

    /**
     * @var array
     * ex.:
     * $avoids = [
     *      'name' => ['add']
     * ]
     */
    protected array $avoids = [];

    /**
     * @param string $context
     * @param array $attributes
     *
     * @return $this|AbstractModel
     */
    public function assign(string $context, array $attributes)
    {
        $reducer = static function ($accumulator, $contexts, $field) use ($context) {
            if (in_array($context, $contexts, true)) {
                $accumulator[] = $field;
            }
            return $accumulator;
        };
        $notAllowed = vector($this->avoids)->reduce($reducer, []);

        $filter = static function ($key) use ($notAllowed) {
            return !in_array($key, $notAllowed, true);
        };
        $filtered = array_filter($attributes, $filter, ARRAY_FILTER_USE_KEY);
        return $this->fill($filtered);
    }

    /**
     * @param array $attributes
     *
     * @return $this|AbstractModel
     */
    public function fill(array $attributes)
    {
        if (!count($attributes)) {
            /** @var AbstractModel $this */
            return $this;
        }

        $fillable = $this->getFillable();
        $keys = array_keys($attributes);
        $data = [];
        foreach ($fillable as $field) {
            if (!in_array($field, $keys, true)) {
                continue;
            }
            $value = $attributes[$field];
            if ($value && isset($this->casts[$field])) {
                $value = $this->castValue($this->casts[$field] ?? __UNDEFINED__, $value);
            }
            if (is_string($value)) {
                $value = $this->clear($value);
            }
            $data[$field] = $value;
        }

        /** @var AbstractModel $fill */
        $fill = parent::fill($data);

        $notFillable = array_diff($keys, $fillable);
        foreach ($notFillable as $field) {
            if (!in_array($field, $keys, true)) {
                continue;
            }
            $this->setFilled($field, $attributes[$field]);
        }
        return $fill;
    }

    /**
     * @param string $cast
     * @param mixed $value
     *
     * @return mixed
     */
    protected function castValue(string $cast, $value)
    {
        if ($value === null) {
            return $value;
        }

        if (is_string($value)) {
            return $value;
        }

        if (in_array($cast, ['array', 'object'], true)) {
            return JSON::encode($value);
        }

        return $value;
    }

    /**
     * @param string $value
     *
     * @return string
     */
    protected function clear(string $value): string
    {
        $pattern = '/<script(.*)>(.*)<\/script>$/mi';
        $replacement = '&gt;script$1&lt;$2&gt;/script&lt;';
        return preg_replace($pattern, $replacement, $value);
    }

    /**
     * @param string $key
     * @param null $fallback
     *
     * @return mixed
     */
    public function getFilled(string $key, $fallback = null)
    {
        $keys = array_keys($this->filled);
        if (in_array($key, $keys, true)) {
            return $this->filled[$key];
        }
        return $fallback ?? __UNDEFINED__;
    }

    /**
     * @param string $key
     * @param $value
     *
     * @return $this|AbstractModel
     */
    public function setFilled(string $key, $value)
    {
        $this->filled[$key] = $value;
        return $this;
    }
}
