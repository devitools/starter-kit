<?php

declare(strict_types=1);

namespace Devitools\Http\Controllers\Report;

use Devitools\Auth\Login;
use Devitools\Exceptions\ErrorRuntime;
use Devitools\Http\Controllers\Controller;

use function Devitools\Helper\dashesToCamelCase;

/**
 * Class Report
 *
 * @package Devitools\Http\Controllers\Report
 */
class Report extends Controller
{
    /**
     * @param string $report
     *
     * @return string
     * @throws ErrorRuntime
     */
    protected function getFullQualifiedName(string $report): string
    {
        $name = dashesToCamelCase($report, true);
        $namespace = config('devitools.report.namespace', '\\App\\Report');
        $fullQualifiedName = "{$namespace}\\{$name}";
        if (!class_exists($fullQualifiedName)) {
            throw new ErrorRuntime(['report' => $report]);
        }
        return $fullQualifiedName;
    }

    /**
     * @return string
     */
    protected function getUser(): string
    {
        /** @var Login $user */
        $user = auth()->user();
        return $user->name;
    }
}
