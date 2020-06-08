<?php

declare(strict_types=1);

namespace Source\Http\Controllers\Admin;

use Devitools\Http\Controllers\AbstractRestController;
use Source\Domains\Admin\Profile\ProfileRepository;

/**
 * Class ProfileController
 *
 * @package Source\Http\Controllers\Admin
 */
class ProfileController extends AbstractRestController
{
    /**
     * ProfileController constructor.
     *
     * @param ProfileRepository $repository
     */
    public function __construct(ProfileRepository $repository)
    {
        parent::__construct($repository);
    }
}
