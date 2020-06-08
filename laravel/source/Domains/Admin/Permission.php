<?php

declare(strict_types=1);

namespace Source\Domains\Admin;

use Devitools\Persistence\AbstractModel;

/**
 * Class Permission
 *
 * @property string namespace
 * @package Source\Domains\Admin
 */
class Permission extends AbstractModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'permissions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'profileId',
        'namespace',
    ];

    /**
     * @var array
     */
    protected $rules = [
        'namespace' => ['required'],
    ];

    /**
     * @return array
     */
    public function manyToOne(): array
    {
        return ['profile' => 'profileId'];
    }

    /**
     * @return string
     */
    public function domain(): string
    {
        return 'admin.permission';
    }
}
