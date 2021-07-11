<?php

declare(strict_types=1);

namespace Devitools\Persistence\Model;

/**
 * Class AssignContexts
 *
 * @package Devitools\Persistence\Model
 */
abstract class AssignContexts
{
    /**
     * @var string
     */
    public const CREATE = 'add';

    /**
     * @var string
     */
    public const UPDATE = 'set';
}
