<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use Devitools\Http\Controllers\AbstractRestController as Controller;
use App\Domains\Admin\Profile\ProfileRepository;

/**
 * Class ProfileController
 *
 * @package App\Http\Controllers\Admin
 */
class ProfileController extends Controller
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
