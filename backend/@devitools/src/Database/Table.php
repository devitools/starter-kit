<?php

declare(strict_types=1);

namespace Devitools\Database;

use Illuminate\Database\Schema\Blueprint;

/**
 * Class Table
 *
 * @method Table primary(string | array $columns = '', string $name = null, string $algorithm = null)
 * @method Table unique(string | array $columns = '', string $name = null, string $algorithm = null)
 * @method Table index(string | array $columns = '', string $name = null, string $algorithm = null)
 *
 * @method Table foreign(string | array $columns, string $name = null)
 * @method Table references(string $column)
 * @method Table on(string $table)
 * @method Table onDelete(string $instruction)
 *
 * @method Table bigIncrements(string $column)
 * @method Table withBigIncrements(string $column)
 * @method Table bigInteger(string $column)
 * @method Table withBigInteger(string $column)
 * @method Table binary(string $column)
 * @method Table withBinary(string $column)
 * @method Table boolean(string $column)
 * @method Table withBoolean(string $column)
 * @method Table char(string $column, int $length = null)
 * @method Table withChar(string $column, int $length = null)
 * @method Table date(string $column)
 * @method Table withDate(string $column)
 * @method Table dateTime(string $column, int $precision = 0)
 * @method Table withDateTime(string $column, int $precision = 0)
 * @method Table dateTimeTz(string $column)
 * @method Table withDateTimeTz(string $column)
 * @method Table decimal(string $column, int $total = 8, int $places = 2)
 * @method Table withDecimal(string $column, int $total = 8, int $places = 2)
 * @method Table double(string $column, int $total = 8, int $places = 2)
 * @method Table withDouble(string $column, int $total = 8, int $places = 2)
 * @method Table enum(string $column, array $allowed)
 * @method Table withEnum(string $column, array $allowed)
 * @method Table float(string $column, int $total = 8, int $places = 2)
 * @method Table withFloat(string $column, int $total = 8, int $places = 2)
 * @method Table geometry(string $column)
 * @method Table withGeometry(string $column)
 * @method Table geometryCollection(string $column)
 * @method Table withGeometryCollection(string $column)
 * @method Table increments(string $column)
 * @method Table withIncrements(string $column)
 * @method Table integer(string $column)
 * @method Table withInteger(string $column)
 * @method Table ipAddress(string $column)
 * @method Table withIpAddress(string $column)
 * @method Table json(string $column)
 * @method Table withJson(string $column)
 * @method Table jsonb(string $column)
 * @method Table withJsonb(string $column)
 * @method Table lineString(string $column)
 * @method Table withLineString(string $column)
 * @method Table longText(string $column)
 * @method Table withLongText(string $column)
 * @method Table macAddress(string $column)
 * @method Table withMacAddress(string $column)
 * @method Table mediumIncrements(string $column)
 * @method Table withMediumIncrements(string $column)
 * @method Table mediumInteger(string $column)
 * @method Table withMediumInteger(string $column)
 * @method Table mediumText(string $column)
 * @method Table withMediumText(string $column)
 * @method Table morphs(string $column)
 * @method Table withMorphs(string $column)
 * @method Table multiLineString(string $column)
 * @method Table withMultiLineString(string $column)
 * @method Table multiPoint(string $column)
 * @method Table withMultiPoint(string $column)
 * @method Table multiPolygon(string $column)
 * @method Table withMultiPolygon(string $column)
 * @method Table nullableMorphs(string $column)
 * @method Table withNullableMorphs(string $column)
 * @method Table point(string $column)
 * @method Table withPoint(string $column)
 * @method Table polygon(string $column)
 * @method Table withPolygon(string $column)
 * @method Table smallIncrements(string $column)
 * @method Table withSmallIncrements(string $column)
 * @method Table smallInteger(string $column)
 * @method Table withSmallInteger(string $column)
 * @method Table string(string $column, int $length = 255)
 * @method Table withString(string $column, int $length = 255)
 * @method Table text(string $column)
 * @method Table withText(string $column)
 * @method Table time(string $column)
 * @method Table withTime(string $column)
 * @method Table timeTz(string $column)
 * @method Table withTimeTz(string $column)
 * @method Table timestamp(string $column)
 * @method Table withTimestamp(string $column)
 * @method Table timestampTz(string $column)
 * @method Table withTimestampTz(string $column)
 * @method Table tinyIncrements(string $column)
 * @method Table withTinyIncrements(string $column)
 * @method Table tinyInteger(string $column)
 * @method Table withTinyInteger(string $column)
 * @method Table unsignedBigInteger(string $column)
 * @method Table withUnsignedBigInteger(string $column)
 * @method Table unsignedDecimal(string $column, int $total = 8, int $places = 2)
 * @method Table withUnsignedDecimal(string $column, int $total = 8, int $places = 2)
 * @method Table unsignedInteger(string $column)
 * @method Table withUnsignedInteger(string $column)
 * @method Table unsignedMediumInteger(string $column)
 * @method Table withUnsignedMediumInteger(string $column)
 * @method Table unsignedSmallInteger(string $column)
 * @method Table withUnsignedSmallInteger(string $column)
 * @method Table unsignedTinyInteger(string $column)
 * @method Table withUnsignedTinyInteger(string $column)
 * @method Table uuid(string $column)
 * @method Table efficientUuid(string $column)
 * @method Table withUuid(string $column)
 * @method Table year(string $column)
 * @method Table withYear(string $column)
 *
 * @method Table rememberToken()
 * @method Table softDeletes()
 * @method Table softDeletesTz()
 * @method Table nullableTimestamps()
 * @method Table timestamps(int $precision = 0)
 * @method Table timestampsTz(int $precision = 0)
 *
 * @method Table after(string $column)
 * @method Table autoIncrement()
 * @method Table charset(string $charset)
 * @method Table collation(string $collation)
 * @method Table comment(string $comment)
 * @method Table default(mixed $value)
 * @method Table first()
 * @method Table nullable(mixed $value = true)
 * @method Table storedAs(string $expression)
 * @method Table unsigned()
 * @method Table useCurrent()
 * @method Table virtualAs(string $expression)
 * @method Table change()
 *
 * @method void dropColumn(string $column)
 * @method void dropPrimary(string $index = null)
 * @method void dropUnique(string $index)
 * @method void dropIndex(string $index)
 * @method void dropSpatialIndex(string $index)
 * @method void dropForeign(string $index)
 * @method void dropTimestamps()
 * @method void dropTimestampsTz()
 * @method void dropSoftDeletes()
 * @method void dropSoftDeletesTz()
 * @method void dropRememberToken()
 * @method void dropMorphs(string $name, $indexName = null)
 *
 * @package Devitools\Database
 */
class Table
{
    /**
     * @var Blueprint
     */
    protected Blueprint $blueprint;

    /**
     * Table constructor.
     * @param Blueprint $blueprint
     */
    public function __construct(Blueprint $blueprint)
    {
        $this->blueprint = $blueprint;
    }

    /**
     * @param Blueprint $blueprint
     *
     * @return static
     */
    public static function make(Blueprint $blueprint): self
    {
        return new static($blueprint);
    }

    /**
     * is triggered when invoking inaccessible methods in an object context.
     *
     * @param $name string
     * @param $arguments array
     * @return mixed
     * @link http://php.net/manual/en/language.oop5.overloading.php#language.oop5.overloading.methods
     */
    public function __call($name, $arguments)
    {
        $prefix = substr($name, 0, 4);
        if ($prefix === 'with') {
            $name = lcfirst(substr($name, 4));
            return $this->run($name, $arguments);
        }

        if (!$this->isCreator($name)) {
            return $this->run($name, $arguments);
        }

        if (!isset($arguments[0])) {
            return $this->run($name, $arguments);
        }

        $column = $arguments[0];
        if (!$this->alreadyExists($column)) {
            return $this->run($name, $arguments);
        }

        return null;
    }

    /**
     * @param string $column
     * @return bool
     */
    private function alreadyExists(string $column): bool
    {
        return Schema::hasColumn($this->blueprint->getTable(), $column);
    }

    /**
     * @param string $method
     * @return bool
     */
    private function isCreator(string $method): bool
    {
        $creators = [
            'bigIncrements',
            'bigInteger',
            'binary',
            'boolean',
            'char',
            'date',
            'dateTime',
            'dateTimeTz',
            'decimal',
            'double',
            'enum',
            'float',
            'geometry',
            'geometryCollection',
            'increments',
            'integer',
            'ipAddress',
            'json',
            'jsonb',
            'lineString',
            'longText',
            'macAddress',
            'mediumIncrements',
            'mediumInteger',
            'mediumText',
            'morphs',
            'multiLineString',
            'multiPoint',
            'multiPolygon',
            'nullableMorphs',
            'point',
            'polygon',
            'smallIncrements',
            'smallInteger',
            'string',
            'text',
            'time',
            'timeTz',
            'timestamp',
            'timestampTz',
            'tinyIncrements',
            'tinyInteger',
            'unsignedBigInteger',
            'unsignedDecimal',
            'unsignedInteger',
            'unsignedMediumInteger',
            'unsignedSmallInteger',
            'unsignedTinyInteger',
            'uuid',
            'year',
        ];
        return in_array($method, $creators);
    }

    /**
     * @param string $name
     * @param array $arguments
     * @return mixed
     */
    private function run(string $name, array $arguments)
    {
        return call_user_func_array([$this->blueprint, $name], $arguments);
    }
}
