<?php

declare(strict_types=1);

namespace Source\Domains\General;

use Devitools\Persistence\AbstractModel;

/**
 * Class Product
 *
 * @package Source\Domains\General
 */
class Product extends AbstractModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * @var array
     */
    protected $rules = [
        'name' => ['required'],
    ];

    /**
     * @return string
     */
    public function domain(): string
    {
        return 'general.product';
    }
}
