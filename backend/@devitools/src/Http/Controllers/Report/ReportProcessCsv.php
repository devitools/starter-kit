<?php

namespace Devitools\Http\Controllers\Report;

use Devitools\Report\AbstractReport;
use Exception;
use Illuminate\Http\Request;

/**
 * Class ReportProcessCsv
 *
 * @package Devitools\Http\Controllers\Report
 */
class ReportProcessCsv extends Report
{
    /**
     * The __invoke method is called when a script tries to call an object as a function.
     *
     * @param Request $request
     * @param string $report
     *
     * @return mixed
     * @throws Exception
     * @link https://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.invoke
     */
    public function __invoke(Request $request, string $report)
    {
        $fullQualifiedName = $this->getFullQualifiedName($report);
        $user = $this->getUser();

        $filters = $request->post();

        /** @var AbstractReport $fullQualifiedName */
        return $fullQualifiedName
            ::build($user, false)
            ->execute($filters, 'csv');
    }
}
