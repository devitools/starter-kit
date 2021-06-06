<?php

declare(strict_types=1);

use Composer\Autoload\ClassLoader;

define('__UNDEFINED__', '#undefined#');

$reflection = new ReflectionClass(ClassLoader::class);
$projectDir = dirname($reflection->getFileName(), 3);

$binaryKey = 'uuid';
$primaryKey = 'id';
if (file_exists($projectDir . '/config/devitools.php')) {
    /** @noinspection PhpIncludeInspection */
    $devitools = require $projectDir . '/config/devitools.php';
    $binaryKey = $devitools['schema']['binaryKey'] ?? 'uuid';
    $primaryKey = $devitools['schema']['primaryKey'] ?? 'id';
}
define('__BINARY_KEY__', $binaryKey);
define('__PRIMARY_KEY__', $primaryKey);
