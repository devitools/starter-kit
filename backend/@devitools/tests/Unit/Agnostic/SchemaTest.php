<?php

declare(strict_types=1);

namespace Devitools\Tests\Unit\Agnostic;

use Devitools\Agnostic\Schema;
use Devitools\Persistence\Model\AssignContexts;
use Devitools\Tests\TestCase;
use Faker\Factory as Faker;
use stdClass;

class SchemaTest extends TestCase
{
    public function testIfSingleSchemaIsCreatedCorrectly()
    {
        $schemaStub = new class() extends Schema {
            public string $field1 = '';
            public string $field2 = '';
            public string $fakeDomain = '';
            public static string $fakeResource = '';

            public function __construct(array $attributes = [])
            {
                $faker = Faker::create('pt_BR');
                $this->field1 = $faker->slug(2);
                $this->field2 = $faker->slug(2);
                $this->fakeDomain = $faker->slug(2);
                self::$fakeResource = $faker->slug(2);

                $this->schema();
            }

            public function domain(): string
            {
                return $this->fakeDomain;
            }

            public static function resource(): string
            {
                return self::$fakeResource;
            }

            public function construct(): void
            {
                $this->addField($this->field1);
                $this->addField($this->field2);
            }
        };

        $fields = $schemaStub->getFields();

        $this->assertCount(2, $fields);
        $this->assertArrayHasKey($schemaStub->field1, $fields);
        $this->assertArrayHasKey($schemaStub->field2, $fields);
        $this->assertCount(12, (array)$fields[$schemaStub->field1]);
        $this->assertCount(12, (array)$fields[$schemaStub->field2]);
        $this->assertInstanceOf(stdClass::class, $fields[$schemaStub->field1]);
        $this->assertInstanceOf(stdClass::class, $fields[$schemaStub->field2]);
        $this->assertSame([$schemaStub::$fakeResource, $schemaStub::PRIMARY_KEY], $schemaStub::identifier());

        $this->assertSame($schemaStub->field1, $fields[$schemaStub->field1]->key);
        $this->assertSame('string', $fields[$schemaStub->field1]->type);
        $this->assertSame([], $fields[$schemaStub->field1]->rules);
        $this->assertSame([], $fields[$schemaStub->field1]->scopes);
        $this->assertNull($fields[$schemaStub->field1]->cast);
        $this->assertTrue($fields[$schemaStub->field1]->fill);
        $this->assertFalse($fields[$schemaStub->field1]->unique);
        $this->assertFalse($fields[$schemaStub->field1]->currency);
        $this->assertFalse($fields[$schemaStub->field1]->hidden);
        $this->assertNull($fields[$schemaStub->field1]->avoid);
        $this->assertNull($fields[$schemaStub->field1]->value);
        $this->assertNull($fields[$schemaStub->field1]->calculated);

        $this->assertSame($schemaStub->field2, $fields[$schemaStub->field2]->key);
        $this->assertSame('string', $fields[$schemaStub->field2]->type);
        $this->assertSame([], $fields[$schemaStub->field2]->rules);
        $this->assertSame([], $fields[$schemaStub->field2]->scopes);
        $this->assertNull($fields[$schemaStub->field2]->cast);
        $this->assertTrue($fields[$schemaStub->field2]->fill);
        $this->assertFalse($fields[$schemaStub->field2]->unique);
        $this->assertFalse($fields[$schemaStub->field2]->currency);
        $this->assertFalse($fields[$schemaStub->field2]->hidden);
        $this->assertNull($fields[$schemaStub->field2]->avoid);
        $this->assertNull($fields[$schemaStub->field2]->value);
        $this->assertNull($fields[$schemaStub->field2]->calculated);
    }

    public function testIfCustomPropertiesChangeSchemaParams()
    {
        $schemaStub = new class() extends Schema {
            public array $fakeRules = [];
            public array $fakeScopes = [];
            public string $fakeValue = '';
            public string $fakeCalculated = '';

            public function __construct(array $attributes = [])
            {
                $faker = Faker::create('pt_BR');
                $this->fakeRules = [$faker->slug(1), $faker->slug(2)];
                $this->fakeScopes = [$faker->slug(1), $faker->slug(2)];
                $this->fakeCalculated = $faker->slug(1);
                $this->fakeValue = $faker->word();

                $this->schema();
            }

            public function domain(): string
            {
                return 'fake-domain';
            }

            public static function resource(): string
            {
                return 'fake-resource';
            }

            public function construct(): void
            {
                $this->addField('name', [
                    'type' => 'float',
                    'rules' => $this->fakeRules,
                    'scopes' => $this->fakeScopes,
                    'cast' => 'double',
                    'fill' => false,
                    'unique' => true,
                    'currency' => true,
                    'hidden' => true,
                    'avoid' => 'all',
                    'value' => $this->fakeValue,
                    'calculated' => $this->fakeCalculated,
                ]);
            }
        };

        $fields = $schemaStub->getFields();

        $this->assertSame('name', $fields['name']->key);
        $this->assertSame('float', $fields['name']->type);
        $this->assertSame($schemaStub->fakeRules, $fields['name']->rules);
        $this->assertSame($schemaStub->fakeScopes, $fields['name']->scopes);
        $this->assertSame('double', $fields['name']->cast);
        $this->assertFalse($fields['name']->fill);
        $this->assertTrue($fields['name']->unique);
        $this->assertTrue($fields['name']->currency);
        $this->assertTrue($fields['name']->hidden);
        $this->assertSame('all', $fields['name']->avoid);
        $this->assertSame($schemaStub->fakeValue, $fields['name']->value);
        $this->assertSame($schemaStub->fakeCalculated, $fields['name']->calculated);
    }

    public function testIfBasicHelperFieldsMethodsChangesSchema()
    {
        $schemaStub = new class() extends Schema {
            public string $fakeValue = '';

            public function __construct(array $attributes = [])
            {
                $faker = Faker::create('pt_BR');
                $this->fakeValue = $faker->text(30);
                $this->schema();
            }

            public function domain(): string
            {
                return 'fake-domain';
            }

            public static function resource(): string
            {
                return 'fake-resource';
            }

            public function construct(): void
            {
                $this->addField('name')
                    ->unique(false)
                    ->hidden(false)
                    ->massAssignment(false)
                    ->castAs('datetime')
                    ->defaultValue($this->fakeValue);
            }
        };

        $fields = $schemaStub->getFields();

        $this->assertSame($schemaStub->fakeValue, $fields['name']->value);
        $this->assertFalse($fields['name']->unique);
        $this->assertFalse($fields['name']->hidden);
        $this->assertFalse($fields['name']->fill);
        $this->assertSame('datetime', $fields['name']->cast);
    }

    public function testValuesWhenDifferentContextAvoidIsProvided()
    {
        $schemaStub = new class() extends Schema {
            public string $field1 = '';
            public string $field2 = '';
            public string $field3 = '';
            public string $field2Avoid = '';
            public array $field3Avoid = [];

            public function __construct(array $attributes = [])
            {
                $faker = Faker::create('pt_BR');
                $this->field1 = $faker->slug(2);
                $this->field2 = $faker->slug(2);
                $this->field3 = $faker->slug(2);
                $this->field2Avoid = $faker->slug(2);
                $this->field3Avoid = [$faker->slug(2), $faker->slug(2)];

                $this->schema();
            }

            public function domain(): string
            {
                return 'fake-domain';
            }

            public static function resource(): string
            {
                return 'fake-resource';
            }

            public function construct(): void
            {
                $this->addField($this->field1)
                    ->avoid('all');

                $this->addField($this->field2)
                    ->avoid($this->field2Avoid);

                $this->addField($this->field3)
                    ->avoid($this->field3Avoid);
            }
        };

        $fields = $schemaStub->getFields();

        $this->assertSame([AssignContexts::CREATE, AssignContexts::UPDATE], $fields[$schemaStub->field1]->avoid);
        $this->assertSame([$schemaStub->field2Avoid], $fields[$schemaStub->field2]->avoid);
        $this->assertSame($schemaStub->field3Avoid, $fields[$schemaStub->field3]->avoid);
    }

    public function testIfDefaultMethodReturnDefaultValuesCorrectly()
    {
        $schemaStub = new class() extends Schema {
            public string $field1 = '';
            public string $field2 = '';
            public string $field3 = '';
            public string $value1 = '';

            public function __construct(array $attributes = [])
            {
                $faker = Faker::create('pt_BR');
                $this->field1 = $faker->slug(3);
                $this->field2 = $faker->slug(3);
                $this->field3 = $faker->slug(3);
                $this->value1 = $faker->text(30);
                $this->schema();
            }

            public function domain(): string
            {
                return 'fake-domain';
            }

            public static function resource(): string
            {
                return 'fake-resource';
            }

            public function construct(): void
            {
                $this->addField($this->field1)
                    ->defaultValue($this->value1);

                $this->addField($this->field2);
                $this->addField($this->field3);
            }
        };

        $defaults = $schemaStub->getDefaults();

        $this->assertCount(1, $defaults);
        $this->assertSame($schemaStub->value1, $defaults[$schemaStub->field1]);
    }
}
