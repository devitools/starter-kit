<?php

declare(strict_types=1);

namespace Devitools\Http\Controllers\File;

use Devitools\Exceptions\ErrorValidation;
use Devitools\Http\Controllers\AbstractController;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

use function Devitools\Helper\uuid;

/**
 * Class Upload
 *
 * @package Devitools\Http\File
 */
class Upload extends AbstractController
{
    /**
     * @param Request $request
     * @param string $any
     *
     * @return JsonResponse
     * @throws ErrorValidation
     * @throws Exception
     */
    public function __invoke(Request $request, string $any)
    {
        $document = $request->file('document');
        if (!$document) {
            throw new ErrorValidation(['document' => 'required']);
        }

        $extension = $document->getClientOriginalExtension();
        $reference = uuid();
        if ($request->get('reference')) {
            preg_match_all('/.*\/(.*)\..*/', $request->get('reference'), $matches, PREG_SET_ORDER, 0);
            if (isset($matches[0], $matches[0][1])) {
                $reference = $matches[0][1];
            }
        }
        $resource = "{$any}/{$reference}.{$extension}";
        $path = "statics/{$resource}";

        if (Storage::disk('minio')->put($path, File::get($document->getRealPath()))) {
            return $this->answerSuccess(['resource' => $resource]);
        }
        return $this->answerError("Can't save the path: '{$path}'");
    }
}
