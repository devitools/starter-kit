<?php

declare(strict_types=1);

namespace Devitools\Agnostic;

/**
 * Trait Validation
 *
 * @package Devitools\Agnostic
 */
trait Validation
{
    /**
     * @param string $rule
     * @param array $parameters
     *
     * @return $this
     */
    protected function validationAdd(string $rule, array $parameters = []): self
    {
        if (count($parameters)) {
            $details = implode(',', $parameters);
            $rule = "{$rule}:{$details}";
        }
        $this->fields[$this->currentField]->rules[] = $rule;
        return $this;
    }

    /**
     * @param string $rule
     *
     * @return $this
     */
    protected function validationRemove(string $rule): self
    {
        if (($key = array_search('required', $this->fields[$this->currentField]->rules, true)) !== false) {
            unset($this->fields[$this->currentField]->rules[$key]);
        }
        return $this;
    }

    /**
     * @param $min
     *
     * @return $this
     */
    protected function validationMin($min): self
    {
        return $this->validationAdd('min', [$min]);
    }

    /**
     * @param $max
     *
     * @return $this
     */
    protected function validationMax($max): self
    {
        return $this->validationAdd('max', [$max]);
    }

    /**
     * @return $this
     */
    protected function validationEmail(): self
    {
        return $this->validationAdd('email');
    }

    /**
     * @return $this
     */
    protected function validationRequired(): self
    {
        return $this->validationAdd('required');
    }

    /**
     * @return $this
     */
    protected function validationString(): self
    {
        return $this->validationAdd('string');
    }

    /**
     * @return $this
     */
    protected function validationSometimes(): self
    {
        return $this->validationAdd('sometimes');
    }

    /**
     * @param string $regex
     *
     * @return $this
     */
    protected function validationRegex(string $regex): self
    {
        return $this->validationAdd('regex', [$regex]);
    }

    /**
     * @param array $options
     *
     * @return $this
     */
    protected function validationIn(array $options): self
    {
        return $this->validationAdd('in', $options);
    }
}
