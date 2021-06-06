<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

use Devitools\Http\Status;
use Exception;

use function Devitools\Helper\error;
use function is_string;

/**
 * Class ErrorGeneral
 *
 * @package Devitools\Exceptions
 */
abstract class ErrorGeneral extends Exception implements ErrorInterface
{
    /**
     * @var int
     */
    protected int $statusCode = Status::CODE_500;

    /**
     * @var array
     */
    protected array $details = [];

    /**
     * @var string
     */
    protected string $defaultMessage = 'Server error';

    /**
     * ErrorValidation constructor.
     *
     * @param array $details
     * @param string|null $message
     * @param int|null $code
     * @param Exception|null $previous
     */
    public function __construct(
        array $details,
        string $message = null,
        ?int $code = 0,
        Exception $previous = null
    ) {
        parent::__construct($message ?: $this->defaultMessage, $code, $previous);

        $this->details = $this->parseDetails($details);
    }

    /**
     * @param array $details
     *
     * @return array
     */
    protected function parseDetails(array $details): array
    {
        foreach ($details as $field => &$value) {
            if (!is_string($value)) {
                continue;
            }
            $value = error($field, $value, null);
        }
        return array_values($details);
    }

    /**
     * @return array
     */
    public function getDetails(): array
    {
        return $this->details;
    }

    /**
     * @return int
     */
    public function getStatusCode(): int
    {
        return $this->statusCode;
    }
}
