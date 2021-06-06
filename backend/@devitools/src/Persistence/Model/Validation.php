<?php

declare(strict_types=1);

namespace Devitools\Persistence\Model;

use Devitools\Exceptions\ErrorValidation;
use Illuminate\Contracts\Validation\Validator as ValidatorContract;
use Illuminate\Support\Facades\Validator;

use function Devitools\Helper\decodeUuid;
use function Devitools\Helper\error;

/**
 * Trait Validation
 *
 * @package Devitools\Persistence\Model
 */
trait Validation
{
    /**
     * @var array
     */
    protected $rules = [];

    /**
     * @var array
     */
    protected array $uniques = [];

    /**
     * @var array
     */
    private array $errors = [];

    /**
     * @var string
     */
    protected string $validationPath = '';

    /**
     * @return bool
     * @throws ErrorValidation
     */
    public function validate(): bool
    {
        $validator = Validator::make($this->getAttributes(), $this->getRules());
        if ($validator->fails()) {
            $this->addValidationErrors($validator);
            throw new ErrorValidation($this->getErrors());
        }
        return true;
    }

    /**
     * @return array
     */
    final protected function getRules(): array
    {
        return array_merge_recursive($this->rules, array_reduce($this->uniques, function ($accumulate, $unique) {
            $accumulate[$unique] = "unique:{$this->table},{$unique}";
            if ($id = $this->getValue($this->primaryKey)) {
                $id = decodeUuid($id);
                $accumulate[$unique] = "unique:{$this->table},{$unique},{$id}";
            }
            return $accumulate;
        }, []));
    }

    /**
     * @param ValidatorContract $validator
     *
     * @return void
     */
    final protected function addValidationErrors(ValidatorContract $validator): void
    {
        $invalid = $validator->invalid();
        foreach ($validator->failed() as $property => $errors) {
            $value = $invalid[$property] ?? null;
            $this->registerValidationErrors($errors, $property, $value);
        }
    }

    /**
     * @param array $errors
     * @param string $property
     * @param mixed $value
     *
     * @return void
     */
    private function registerValidationErrors(array $errors, string $property, $value): void
    {
        $manyToOne = $this->manyToOne();
        foreach ($manyToOne as $alias => $column) {
            if ($column !== $property) {
                continue;
            }
            /** @var string $alias */
            $property = $alias;
            break;
        }
        foreach ($errors as $error => $datum) {
            $message = strtolower($error);
            if ($this->validationPath) {
                $property = "{$this->validationPath}.{$property}";
            }
            $parameters = $datum;
            if (count($datum) === 1) {
                $parameters = [strtolower($error) => $datum[0]];
            }
            $this->addError($property, $message, $value, $parameters);
        }
    }

    /**
     * @param string $property
     * @param string $message
     * @param mixed $value
     * @param array $parameters
     * @param mixed $code
     *
     * @return $this
     */
    final protected function addError(string $property, string $message, $value, $parameters = [], $code = null): self
    {
        $this->errors[] = error($property, $message, $value, $parameters, $code);
        return $this;
    }

    /**
     * @return array
     */
    final public function getErrors(): array
    {
        return $this->errors;
    }
}
