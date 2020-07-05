<?php

declare(strict_types=1);

namespace Source\Http\Controllers\General;

use Devitools\Http\Controllers\AbstractRestController;
use Source\Domains\General\Type\TypeRepository;

/**
 * Class TypeController
 *
 * @package Source\Http\Controllers\General
 */
class TypeController extends AbstractRestController
{
    /**
     * TypeController constructor.
     *
     * @param TypeRepository $repository
     */
    public function __construct(TypeRepository $repository)
    {
        parent::__construct($repository);
    }
}
