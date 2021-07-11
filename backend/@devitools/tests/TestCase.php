<?php

declare(strict_types=1);

namespace Devitools\Tests;

use Mockery;
use Faker\Generator;
use Faker\Factory as Faker;
use PHPUnit\Framework\TestCase as PhpUnitTestCase;

abstract class TestCase extends PhpUnitTestCase
{
    protected Generator $faker;

    public function __construct(?string $name = null, array $data = [], $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
        $this->faker = Faker::create('pt_BR');
    }

    /**
     * Clean up after test.
     */
    protected function tearDown(): void
    {
        Mockery::close();
    }
}
