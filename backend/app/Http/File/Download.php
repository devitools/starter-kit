<?php

declare(strict_types=1);

namespace App\Http\File;

use Devitools\Http\Controllers\File\Download as Devitools;
use Illuminate\Support\Facades\Storage;

/**
 * Class Download
 *
 * @package App\Http\File
 */
class Download extends Devitools
{
    /**
     * @param string $path
     *
     * @return array
     */
    protected function getHeaders(string $path): array
    {
        if (str_starts_with($path, 'files/despesas')) {
            return ['Content-Type' => 'application/pdf'];
        }
        $mimeType = Storage::disk('minio')->mimeType($path);
        return ['Content-Type' => $mimeType];
    }
}
