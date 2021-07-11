<?php


namespace Devitools\Http\Controllers\Rest;


use Illuminate\Http\Request;

trait Data
{
    protected function getData(Request $request): array
    {
        return $request->all();
    }
}
