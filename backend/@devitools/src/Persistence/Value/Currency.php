<?php

declare(strict_types=1);

namespace Devitools\Persistence\Value;

use Devitools\Exceptions\ErrorInvalidArgument;
use Devitools\Persistence\ModelInterface;
use Illuminate\Contracts\Database\Eloquent\Castable;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Contracts\Database\Eloquent\CastsInboundAttributes;
use JsonSerializable;

use function PhpBrasil\Collection\Helper\stringify;

/**
 * Class Currency
 *
 * @package Devitools\Units\Common
 */
class Currency implements JsonSerializable, Castable
{
    /**
     * @var string
     */
    private string $amount;

    /**
     * @var string
     */
    private string $cents;

    /**
     * Currency constructor.
     *
     * @param string $amount
     * @param string $cents
     * @param int $precision
     */
    public function __construct(string $amount, string $cents, int $precision)
    {
        $this->amount = $amount;
        $this->cents = str_pad($cents, $precision, '0');
    }

    /**
     * @param float|int|Currency|null $value
     * @param int|null $precision
     *
     * @return Currency
     * @throws ErrorInvalidArgument
     */
    public static function fromValue($value, ?int $precision = null): Currency
    {
        if ($value instanceof self) {
            return $value;
        }
        return static::fromNumber($value, $precision);
    }

    /**
     * Get the name of the caster class to use when casting from / to this cast target.
     *
     * @param array $arguments
     *
     * @return string|CastsAttributes|CastsInboundAttributes
     */
    public static function castUsing(array $arguments = [])
    {
        return new static('', '', env('APP_PRECISION', 2));
    }

    /**
     * @param ModelInterface $instance
     * @param string $key
     * @param int $value
     * @param array $attributes
     *
     * @return mixed
     */
    public function get(ModelInterface $instance, string $key, int $value, array $attributes)
    {
        return static::fromInteger($value);
    }

    /**
     * @param ModelInterface $instance
     * @param string $key
     * @param Currency|int $value
     * @param array $attributes
     *
     * @return mixed
     * @throws ErrorInvalidArgument
     */
    public function set(ModelInterface $instance, string $key, $value, array $attributes)
    {
        if ($value instanceof self) {
            return $value->toNumber();
        }
        return static::fromValue($value);
    }

    /**
     * @param float|int|null $value
     * @param int|null $precision
     *
     * @return Currency
     * @throws ErrorInvalidArgument
     */
    public static function fromNumber($value, ?int $precision = null): Currency
    {
        $precision ??= env('APP_PRECISION', 2);
        if ($value === null) {
            return new static('0', '0', $precision);
        }

        if (!is_numeric($value)) {
            $details = ['number' => 'invalid'];
            $string = stringify($value);
            $message = "Int or float expected, '{$string}' given";
            throw new ErrorInvalidArgument($details, $message);
        }

        if (strpos((string)$value, '.') === false) {
            return new static((string)$value, '0', $precision);
        }

        $string = number_format((float)$value, $precision, '.', '');
        [$amount, $cents] = (array)explode('.', $string);
        return new static((string)$amount, (string)$cents, $precision);
    }

    /**
     * @param int|null $value
     * @param int|null $precision
     *
     * @return Currency
     */
    public static function fromInteger(?int $value, ?int $precision = null): Currency
    {
        $precision ??= env('APP_PRECISION', 2);
        if ($value === null) {
            return new static('0', '0', $precision);
        }
        $amount = ($value / (10 ** $precision));
        return new static((string)$amount, '0', $precision);
    }

    /**
     * @return int
     */
    public function toInteger(): int
    {
        return (int)"{$this->amount}{$this->cents}";
    }

    /**
     * @return float
     */
    public function toNumber(): float
    {
        return (float)"{$this->amount}.{$this->cents}";
    }

    /**
     * @return string
     */
    public function toString(): string
    {
        return (string)$this->toInteger();
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->toString();
    }

    /**
     * Specify data which should be serialized to JSON
     *
     * @link https://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4
     */
    public function jsonSerialize()
    {
        return $this->toNumber();
    }
}
