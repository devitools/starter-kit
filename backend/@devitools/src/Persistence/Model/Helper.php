<?php

declare(strict_types=1);

namespace Devitools\Persistence\Model;

use function Devitools\Helper\decodeUuid;
use function Devitools\Helper\encodeUuid;

/**
 * Trait Helper
 *
 * @package Devitools\Persistence\Model
 */
trait Helper
{
    /**
     * @param $value
     *
     * @return string
     */
    public static function encodeUuid($value): ?string
    {
        if (!$value) {
            return null;
        }
        return encodeUuid($value);
    }

    /**
     * @param $value
     *
     * @return string
     */
    public static function decodeUuid($value): ?string
    {
        if (!$value) {
            return null;
        }
        return decodeUuid($value);
    }
}
