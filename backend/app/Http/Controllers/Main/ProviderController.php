<?php

declare(strict_types=1);

namespace Source\Http\Controllers\Main;

use Devitools\Http\Controllers\AbstractRestController;
use Source\Domains\Main\Provider\ProviderRepository;

/**
 * Class ProviderController
 *
 * @package Source\Http\Controllers\Main
 */
class ProviderController extends AbstractRestController
{
    /**
     * ProviderController constructor.
     *
     * @param ProviderRepository $repository
     */
    public function __construct(ProviderRepository $repository)
    {
        parent::__construct($repository);
    }
}
