<?php

declare(strict_types=1);

namespace App\Domains\Shared;

/**
 * Class SpecialPermission
 *
 * @package App\Domains\Shared
 */
abstract class SpecialPermission
{
    /**
     * @var string
     */
    public const SP_001 = 'special:registration/athlete-license.technical/club';

    /**
     * @var string
     */
    public const SP_002 = 'special:registration/athlete-license.technical/federation';

    /**
     * @var string
     */
    public const SP_003 = 'special:registration/athlete-license.technical/committee';

    /**
     * @var string
     */
    public const SP_004 = 'special:registration/athlete-license.financial/federation';

    /**
     * @var string
     */
    public const SP_005 = 'special:registration/athlete-license.financial/confederation';

    /**
     * PermissionSpecial constructor.
     */
    private function __construct()
    {
    }
}
