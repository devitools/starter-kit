<?php

declare(strict_types=1);

namespace Devitools\Persistence\Repository;

use Devitools\Exceptions\ErrorExternalIntegration;
use Devitools\Exceptions\ErrorInvalidArgument;
use Devitools\Persistence\Value\Currency;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;

use function in_array;

/**
 * Trait Prepare
 *
 * @package Devitools\Http\Controllers\Rest
 */
trait Prepare
{
    /**
     * @param string $identifier
     * @param array $data
     * @param bool $defaults
     *
     * @return array
     * @throws ErrorExternalIntegration
     * @throws ErrorInvalidArgument
     */
    public function prepare(string $identifier, array $data, bool $defaults = false): array
    {
        $domain = $this->domain();
        $currencies = $this->currencies();

        /** @noinspection AlterInForeachInspection */
        foreach ($data as $field => &$value) {
            if ($value instanceof UploadedFile) {
                $value = $this->parseFile($domain, $identifier, $field, $value);
                continue;
            }
            if (in_array($field, $currencies, true)) {
                $value = Currency::fromValue($value);
            }
        }

        if (!$defaults) {
            return $data;
        }
        return array_merge($this->getDefaults(), $data);
    }

    /**
     * @param string $domain
     * @param string $identifier
     * @param string $field
     * @param UploadedFile $file
     *
     * @return string
     * @throws ErrorExternalIntegration
     */
    protected function parseFile(string $domain, string $identifier, string $field, UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        $path = "{$domain}/$identifier/{$field}";
        if (!Storage::disk('minio')->put($path, File::get($file->getRealPath()))) {
            throw new ErrorExternalIntegration('Cloud storage not available');
        }
        return "{$domain}/$identifier/{$field}.{$extension}";
    }
}
