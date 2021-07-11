<?php

declare(strict_types=1);

namespace Devitools\Http\Support;

/**
 * Class Scopes
 *
 * @package Devitools\Http\Support
 */
abstract class Levels
{
    /**
     * @var string
     */
    public const LEVEL_INDEX = 'index';

    /**
     * @var string
     */
    public const LEVEL_ADD = 'add';

    /**
     * @var string
     */
    public const LEVEL_VIEW = 'view';

    /**
     * @var string
     */
    public const LEVEL_EDIT = 'edit';

    /**
     * @var string
     */
    public const LEVEL_REMOVE = 'destroy';

    /**
     * @var string
     */
    public const LEVEL_TRASH = 'trash';
}
