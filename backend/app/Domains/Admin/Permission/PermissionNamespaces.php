<?php

declare(strict_types=1);

namespace App\Domains\Admin\Permission;

use function PhpBrasil\Collection\pack;

/**
 * Class PermissionNamespaces
 *
 * @package App\Domains\Admin\Permission
 */
abstract class PermissionNamespaces
{
    /**
     * @var array
     */
    protected static array $namespaces = [];

    /**
     * @var array
     */
    protected static array $dependencies = [];

    /**
     * @return array
     */
    public static function getNamespaces(): array
    {
        return static::$namespaces;
    }

    /**
     * @return array
     */
    public static function getDependencies(): array
    {
        return static::$dependencies;
    }

    /**
     * @return void
     */
    public static function bootstrap(): void
    {
        static::register('admin.profile');
        static::register('admin.user', [], ['action' => ['admin.profile.index']]);
    }

    /**
     * @param string $domain
     * @param array $levels
     * @param array $dependencies
     */
    public static function register(string $domain, array $levels = [], array $dependencies = []): void
    {
        if (!count($levels)) {
            $levels = [
                'action',
                'add',
                'destroy',
                'edit',
                'index',
                'trash',
                'view',
            ];
        }

        $namespaces = array_map(static fn($level) => "{$domain}.{$level}", $levels);
        static::$namespaces = [...static::$namespaces, ...$namespaces];

        if (in_array('action', $levels, true)) {
            $dependencies['action'] = static::defaultDependencies($domain, $dependencies);
        }

        $reducer = static function ($accumulator, $dependencies, $level) use ($domain) {
            $namespace = "{$domain}.{$level}";
            if (!isset($accumulator[$namespace])) {
                $accumulator[$namespace] = $dependencies;
                return $accumulator;
            }
            $accumulator[$namespace] = array_merge($accumulator[$namespace], $dependencies);
            return $accumulator;
        };

        static::$dependencies = (array)pack($dependencies)->reduce($reducer, static::$dependencies);
    }

    /**
     * @param string $namespace
     *
     * @return mixed
     */
    public static function dependencies(string $namespace): array
    {
        return static::$dependencies[$namespace] ?? [];
    }

    /**
     * @param string $domain
     * @param array $dependencies
     *
     * @return string[]
     */
    private static function defaultDependencies(string $domain, array $dependencies): array
    {
        if (!isset($dependencies['action'])) {
            return ["{$domain}.index"];
        }

        if (in_array("{$domain}.index", $dependencies['action'], true)) {
            return $dependencies['action'];
        }

        return array_merge($dependencies['action'], ["{$domain}.index"]);
    }
}
