<?php

declare(strict_types=1);

namespace Source\Domains\General;

use Devitools\Agnostic\Schema;

/**
 * Class Category
 *
 * @package Source\Domains\General
 */
class Category extends Schema
{
    /**
     * The resource associated with the schema.
     *
     * @return string
     */
    public static function resource(): string
    {
        return 'categories';
    }

    /**
     * @return string
     */
    public function domain(): string
    {
        return 'general.category';
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

        $this->addField('description')
            ->isText();

        $this->addField('active')
            ->isToggle();
    }
}
