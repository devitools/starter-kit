<?php

declare(strict_types=1);

namespace Source\Domains\General;

use Devitools\Persistence\AbstractModel;

/**
 * Class Category
 *
 * @package Source\Domains\General
 */
class Category extends AbstractModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'active',
    ];

    /**
     * @var array
     */
    protected $rules = [
        'name' => ['required'],
    ];

    /**
     * @var array
     */
    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * @return string
     */
    public function domain(): string
    {
        return 'general.category';
    }
}
