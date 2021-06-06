<?php

declare(strict_types=1);

namespace Devitools\Http\Controllers;

use Devitools\Http\Controllers\Rest\Create;
use Devitools\Http\Controllers\Rest\Destroy;
use Devitools\Http\Controllers\Rest\Read;
use Devitools\Http\Controllers\Rest\Restore;
use Devitools\Http\Controllers\Rest\Search;
use Devitools\Http\Controllers\Rest\Update;
use Devitools\Http\Support\Permission;

/**
 * Class AbstractRestController
 *
 * @package Devitools\Http
 */
abstract class AbstractRestController extends AbstractPersistenceController implements RestControllerInterface
{
    /**
     * Support
     */
    use Permission;

    /**
     * Basic operations
     */
    use Create;
    use Destroy;
    use Read;
    use Restore;
    use Search;
    use Update;
}
