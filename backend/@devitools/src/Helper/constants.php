<?php

declare(strict_types=1);

use Composer\Autoload\ClassLoader;

const __UNDEFINED__ = '#undefined#';

$reflection = new ReflectionClass(ClassLoader::class);
$projectDir = dirname($reflection->getFileName(), 3);

$binaryKey = 'uuid';
$primaryKey = 'id';
$updatedAt = 'updatedAt';
$createdAt = 'createdAt';
$deletedAt = 'deletedAt';
$updatedBy = 'updatedBy';
$createdBy = 'createdBy';
$deletedBy = 'deletedBy';
if (file_exists($projectDir . '/config/devitools.php')) {
    /** @noinspection PhpIncludeInspection */
    $devitools = require $projectDir . '/config/devitools.php';
    $binaryKey = $devitools['schema']['binaryKey'] ?? 'uuid';
    $primaryKey = $devitools['schema']['primaryKey'] ?? 'id';
    $updatedAt = $devitools['schema']['updatedAt'] ?? 'updatedAt';
    $createdAt = $devitools['schema']['createdAt'] ?? 'createdAt';
    $deletedAt = $devitools['schema']['deletedAt'] ?? 'deletedAt';
    $updatedBy = $devitools['schema']['updatedBy'] ?? 'updatedBy';
    $createdBy = $devitools['schema']['createdBy'] ?? 'createdBy';
    $deletedBy = $devitools['schema']['deletedBy'] ?? 'deletedBy';
}
define('__BINARY_KEY__', $binaryKey);
define('__PRIMARY_KEY__', $primaryKey);
define('__UPDATED_AT__', $updatedAt);
define('__CREATED_AT__', $createdAt);
define('__DELETED_AT__', $deletedAt);
define('__UPDATED_BY__', $updatedBy);
define('__CREATED_BY__', $createdBy);
define('__DELETED_BY__', $deletedBy);
