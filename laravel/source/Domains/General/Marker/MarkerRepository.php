<?php

declare(strict_types=1);

namespace Source\Domains\General\Marker;

use Devitools\Persistence\AbstractRepository;
use Source\Domains\General\Marker;

/**
 * Class MarkerRepository
 *
 * @package Source\Domains\General\Marker
 */
class MarkerRepository extends AbstractRepository
{
    /**
     * The schema used in repository
     *
     * @var string
     */
    protected string $prototype = Marker::class;
}
