<?php

declare(strict_types=1);

namespace Devitools\Audit;

use Devitools\Persistence\AbstractModel as Common;
use Illuminate\Database\Eloquent\JsonEncodingException;
use OwenIt\Auditing\Models\Audit;
use Throwable;

use function Devitools\Helper\is_binary;

/**
 * Class Model
 *
 * @package Devitools\Audit
 */
class Model extends Audit
{
    /**
     * Cast the given attribute to JSON.
     *
     * @param string $key
     * @param mixed $value
     *
     * @return string
     */
    protected function castAttributeAsJson($key, $value)
    {
        try {
            foreach ($value as $index => $content) {
                if (!is_binary($content)) {
                    continue;
                }
                $value[$index] = Common::decodeUuid($content);
            }

            $value = $this->asJson($value);

            if ($value === false) {
                throw JsonEncodingException::forAttribute(
                    $this,
                    $key,
                    json_last_error_msg()
                );
            }

            return $value;
        } catch (Throwable $error) {
            return null;
        }
    }
}
