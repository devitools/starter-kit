<?php

namespace Devitools\Http\Controllers\Report;

use Devitools\Report\AbstractReport;
use Exception;
use Illuminate\Http\Request;

/**
 * Class ReportProcess
 *
 * @package App\Http\Report
 */
class ReportProcess extends Report
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

        $printing = $request->get('p') === 'true';
        $filters = $request->post();

        /** @var AbstractReport $fullQualifiedName */
        return $fullQualifiedName
            ::build($user, $printing)
            ->execute($filters);
    }
}
