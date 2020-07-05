<?php

declare(strict_types=1);

namespace Source\Http\Controllers\General;

use Devitools\Http\Controllers\AbstractRestController;
use Source\Domains\General\Marker\MarkerRepository;

/**
 * Class MarkerController
 *
 * @package Source\Http\Controllers\General
 */
class MarkerController extends AbstractRestController
{
    /**
     * CategoryController constructor.
     *
     * @param MarkerRepository $repository
     */
    public function __construct(MarkerRepository $repository)
    {
        parent::__construct($repository);
    }
}
