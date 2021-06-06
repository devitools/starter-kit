<?php

namespace Devitools\Agnostic;

/**
 * Trait Events
 *
 * @package Devitools\Agnostic
 */
trait Events
{
    /**
     * @param string $event
     * @param string $handler
     *
     * @return $this
     */
    protected function addEvent(string $event, string $handler): self
    {
        $this->dispatchesEvents[$event] = $handler;
        return $this;
    }
}
