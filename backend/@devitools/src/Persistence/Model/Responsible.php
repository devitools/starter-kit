<?php

declare(strict_types=1);

namespace Devitools\Persistence\Model;

use Devitools\Units\Common\UserSession;
use Throwable;

/**
 * Trait Responsible
 *
 * @package Devitools\Persistence\Model
 */
trait Responsible
{
    /**
     */
    use UserSession;

    /**
     * @return string
     */
    protected function getResponsibleName(): string
    {
        try {
            $user = $this->getUser();
            return "{$user->name} [{$user->id}]";
        } catch (Throwable $exception) {
        }
        return 'anonymous';
    }

    /**
     * @return void
     */
    public function responsibleCreate(): void
    {
        if (config('app.no-responsible')) {
            return;
        }
        $name = $this->getResponsibleName();
        $this->setValue(static::CREATED_BY, $name);
        $this->setValue(static::UPDATED_BY, $name);
    }

    /**
     * @return void
     */
    public function responsibleUpdate(): void
    {
        if (config('app.no-responsible')) {
            return;
        }
        $this->setValue(static::UPDATED_BY, $this->getResponsibleName());
    }

    /**
     * @return void
     */
    public function responsibleDelete(): void
    {
        if (config('app.no-responsible')) {
            return;
        }
        $this->setValue(static::DELETED_BY, $this->getResponsibleName());
    }
}
