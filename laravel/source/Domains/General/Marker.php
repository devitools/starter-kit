<?php

declare(strict_types=1);

namespace Source\Domains\General;

use Devitools\Agnostic\Schema;

/**
 * Class Marker
 *
 * @package Source\Domains\General
 */
class Marker extends Schema
{
    /**
     * The resource associated with the schema.
     *
     * @return string
     */
    public static function resource(): string
    {
        return 'markers';
    }

    /**
     * @return string
     */
    public function domain(): string
    {
        return 'general.marker';
    }

    /**
     * Build the schema fields and actions.
     *
     * @return void
     */
    public function construct(): void
    {
        $this->addField('name')
            ->validationRequired();
    }
}
