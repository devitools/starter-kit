<?php

declare(strict_types=1);

namespace Devitools\Agnostic;

/**
 * Class Hooks
 *
 * @package Devitools\Agnostic
 */
trait Hooks
{
    /**
     * @var array
     */
    protected array $hooks = [];

    /**
     * @param string $event
     * @param string|callable $handler
     *
     * @return $this
     */
    protected function addHook(string $event, $handler): self
    {
        $this->hooks[$event] = $handler;
        return $this;
    }

    /**
     * @param string $hook
     *
     * @return bool
     */
    protected function hasHook(string $hook): bool
    {
        return isset($this->hooks[$hook]);
    }

    /**
     * @param string $hook
     *
     * @return string|callable|null
     */
    protected function getHook(string $hook)
    {
        return $this->hooks[$hook] ?? null;
    }

    /**
     * @param string $hook
     * @param array $parameters
     *
     * @return mixed
     */
    protected function triggerHook(string $hook, $parameters = [])
    {
        if (isset($this->hooks[$hook]) && is_callable($this->hooks[$hook])) {
            return call_user_func_array($this->hooks[$hook], $parameters);
        }
        return null;
    }
}
