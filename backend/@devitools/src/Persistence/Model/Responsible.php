<?php

declare(strict_types=1);

namespace Devitools\Persistence\Model;

use Devitools\Auth\Login;
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
            /** @var Login $user */
            $user = $this->getUser();
            $name = $user->getAttributeValue(config('devitools.auth.name', 'name'));
            $id = $user->getAttributeValue(config('devitools.schema.primaryKey', 'id'));
            return "{$name} [{$id}]";
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
