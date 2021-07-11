<?php

declare(strict_types=1);

namespace Devitools\Persistence\Repository;

use Devitools\Exceptions\ErrorValidation;
use Devitools\Persistence\AbstractModel;
use Illuminate\Database\QueryException;

/**
 * Trait Destroy
 *
 * @package Devitools\Persistence\Repository
 */
trait Destroy
{
    /**
     * @param string $id
     * @param bool $erase
     *
     * @return string
     * @throws ErrorValidation
     */
    public function destroy(string $id, $erase = false): ?string
    {
        /** @var AbstractModel $instance */
        $instance = $this->pull($id, (bool)$erase);
        if ($instance === null) {
            return null;
        }
        if ($erase) {
            try {
                $instance->forceDelete();
                return $id;
            } catch (QueryException $error) {
            }
            if (isset($error->errorInfo[1]) && $error->errorInfo[1] === 1451) {
                throw new ErrorValidation([__PRIMARY_KEY__ => 'related']);
            }
            throw $error;
        }
        $instance->delete();
        return $id;
    }
}
