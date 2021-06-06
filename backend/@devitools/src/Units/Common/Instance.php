<?php

declare(strict_types=1);

namespace Devitools\Units\Common;

/**
 * Trait Instance
 *
 * @package Source\Domains
 */
trait Instance
{
    /**
     * Create a instance of this class
     *
     * @param array $parameters
     *
     * @return $this
     */
    public static function instance(array $parameters = []): self
    {
        return app(static::class, $parameters);
    }
}
