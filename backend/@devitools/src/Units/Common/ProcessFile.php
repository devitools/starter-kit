<?php

declare(strict_types=1);

namespace Devitools\Units\Common;

use Devitools\Exceptions\ErrorExternalIntegration;

/**
 * Trait ProcessFile
 *
 * @package Source\Domains\Util
 */
trait ProcessFile
{
    /**
     * It scrolls through the $file by applying the $function on each line
     * The method will stop if the counter reaches the $ max of lines to go
     *
     * @param string $file
     * @param callable $function
     * @param int $max
     *
     * @return array
     * @throws ErrorExternalIntegration
     */
    protected function walkInFile(string $file, callable $function, int $max = 0)
    {
        $output = [];
        $handle = fopen($file, 'r');
        if (!$handle) {
            throw new ErrorExternalIntegration("Invalid file '{$file}'");
        }
        $count = 0;
        while (($line = fgets($handle)) !== false) {
            $output[] = $function($line, $count);
            $count++;
            if ($count === $max) {
                return $output;
            }
        }
        fclose($handle);
        return $output;
    }
}
