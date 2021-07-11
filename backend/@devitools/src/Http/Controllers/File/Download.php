<?php

declare(strict_types=1);

namespace Devitools\Http\Controllers\File;

use Devitools\Http\Controllers\Controller;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response as ResponseFile;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Php\Text;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Throwable;

use function request;

/**
 * Class Download
 *
 * @package Devitools\Http\File
 */
class Download extends Controller
{
    /**
     * The __invoke method is called when a script tries to call an object as a function.
     *
     * @param string $any
     *
     * @return Application|ResponseFactory|ResponseFile|BinaryFileResponse
     * @link https://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.invoke
     */
    public function __invoke(string $any)
    {
        $path = $this->getPath($any);
        try {
            $headers = $this->getHeaders($path);
            $content = $this->getContent($path);
        } catch (Throwable $exception) {
            return $this->notfoundDownload($path, $exception);
        }

        if (request()->get('download')) {
            return $this->download($any, $headers, $content);
        }
        return $this->respond($any, $headers, $content);
    }

    /**
     * @param string $any
     *
     * @return string
     */
    protected function getPath(string $any): string
    {
        $resource = addslashes($any);
        return preg_replace('/\\.[^.\\s]{3,4}$/', '', $resource);
    }

    /**
     * @param string $path
     *
     * @return array
     */
    protected function getHeaders(string $path): array
    {
        return [
            'Content-Type' => Storage::disk('minio')->mimeType($path)
        ];
    }

    /**
     * @param string $path
     *
     * @return string
     * @throws FileNotFoundException
     */
    protected function getContent(string $path): string
    {
        if (!Text::trim($path)) {
            $path = __UNDEFINED__;
        }
        return Storage::disk('minio')->get($path);
    }

    /**
     * @param string $path
     *
     * @return string
     */
    protected function getName(string $path): string
    {
        $info = pathinfo($path);
        return $info['basename'] ?? '';
    }

    /**
     * @param string $path
     * @param string $content
     * @param array $headers
     *
     * @return BinaryFileResponse
     */
    protected function download(string $path, array $headers, string $content): BinaryFileResponse
    {
        $name = request()->get('name');
        if (!$name) {
            $name = $this->getName($path);
        }
        $filename = storage_path() . '/temp/' . uniqid('static', true);
        file_put_contents($filename, $content);
        return response()->download($filename, $name, $headers)->deleteFileAfterSend();
    }

    /**
     * @param string $path
     * @param array $headers
     * @param string $content
     *
     * @return ResponseFile
     */
    protected function respond(string $path, array $headers, string $content): ResponseFile
    {
        return Response::make($content, 200, $headers);
    }

    /**
     * @param string $path
     * @param Throwable $exception
     *
     * @return Application|ResponseFactory|ResponseFile
     */
    protected function notfoundDownload(string $path, Throwable $exception)
    {
        return response(null, 404);
    }
}
