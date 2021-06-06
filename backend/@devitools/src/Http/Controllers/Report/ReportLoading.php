<?php

namespace Devitools\Http\Controllers\Report;

use Devitools\Http\Controllers\Controller;

/**
 * Class ReportLoading
 *
 * @package App\Http\Report
 */
class ReportLoading extends Controller
{
    /**
     * The __invoke method is called when a script tries to call an object as a function.
     *
     * @return mixed
     * @link https://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.invoke
     */
    public function __invoke()
    {
        return view('report.layout.loading');
    }
}
