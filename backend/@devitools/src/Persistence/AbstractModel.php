<?php

declare(strict_types=1);

namespace Devitools\Persistence;

use Devitools\Exceptions\ErrorInvalidArgument;
use Devitools\Persistence\AbstractModel as Common;
use Devitools\Persistence\Model\Fill;
use Devitools\Persistence\Model\Helper;
use Devitools\Persistence\Model\Hook;
use Devitools\Persistence\Model\Replaceable;
use Devitools\Persistence\Model\Responsible;
use Devitools\Persistence\Model\Validation;
use Devitools\Persistence\Model\Value;
use Devitools\Persistence\Value\Currency;
use Dyrynda\Database\Support\GeneratesUuid as HasBinaryUuid;
use Illuminate\Contracts\Database\Eloquent\Castable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as Auditing;
use OwenIt\Auditing\Exceptions\AuditingException;
use Ramsey\Uuid\Uuid;

use Throwable;

use function Devitools\Helper\counter;
use function Devitools\Helper\is_binary;
use function in_array;

/**
 * Class AbstractModel
 *
 * @property string id
 * @property float|mixed|string counter
 * @package Simples
 * @method AbstractModel create(array $attributes = [])
 * @method AbstractModel where(mixed $reference, mixed $operator = null, mixed $value = null)
 * @method AbstractModel whereIn(string $column, mixed $values)
 * @method AbstractModel orWhere(string $column, mixed $operator, mixed $value = null)
 * @method AbstractModel whereNotNull(string $column)
 * @method AbstractModel whereNull(string $column)
 * @method AbstractModel first()
 * @method static Collection withUuid(string $id)
 * @method Collection get($columns = ['*'])
 */
abstract class AbstractModel extends Eloquent implements ModelInterface, Auditing
{
    /**
     * Basic resources
     */
    use SoftDeletes;
    use HasBinaryUuid;
    use Auditable;
    use Responsible;

    /**
     * Data manipulation
     */
    use Fill;
    use Helper;
    use Hook;
    use Replaceable;
    use Validation;
    use Value;

    /**
     * @var string
     */
    public const CREATED_AT = 'createdAt';

    /**
     * @var string
     */
    public const UPDATED_AT = 'updatedAt';

    /**
     * @var string
     */
    public const DELETED_AT = 'deletedAt';

    /**
     * @var string
     */
    public const UPDATED_BY = 'updatedBy';

    /**
     * @var string
     */
    public const CREATED_BY = 'createdBy';

    /**
     * @var string
     */
    public const DELETED_BY = 'deletedBy';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Indicates whether attributes are snake cased on arrays.
     *
     * @var bool
     */
    public static $snakeAttributes = false;

    /**
     * @var string
     */
    protected $primaryKey = __BINARY_KEY__;

    /**
     * @var string
     */
    protected $uuidVersion = 'uuid1';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [__BINARY_KEY__];

    /**
     * The "type" of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'binary';

    /**
     * Fields that will be added on select
     *
     * @var string[]
     */
    protected array $readable = [];

    /**
     * Fields that are calculated
     *
     * @var array
     */
    protected array $calculated = [];

    /**
     * Fields that are currencies
     *
     * @var array
     */
    protected array $currencies = [];

    /**
     * Boot the trait, adding a creating observer.
     * When persisting a new model instance, we resolve the UUID field, then set
     * a fresh UUID, taking into account if we need to cast to binary or not.
     *
     * @return void
     */
    public static function bootGeneratesUuid(): void
    {
        static::creating(static function (AbstractModel $model) {
            /* @var Eloquent|static $model */
            $uuid = $model->resolveUuid();
            $uuidColumn = $model->uuidColumn();

            if (isset($model->attributes[$uuidColumn]) && $model->attributes[$uuidColumn] !== null) {
                /* @var Uuid $uuid */
                $uuid = Uuid::fromString(strtolower($model->attributes[$uuidColumn]));
            }

            $id = $model->getFilled($model->exposedKey());
            if ($id && $id !== __UNDEFINED__) {
                $uuid = Uuid::fromString($id);
            }

            $model->attributes[$uuidColumn] = $uuid->getBytes();
            $model->attributes[$model->exposedKey()] = $uuid->toString();
        });
    }

    /**
     * @param string $id
     *
     * @return AbstractModel
     */
    public function find(string $id)
    {
        return $this->where($this->exposedKey(), $id)->first();
    }

    /**
     * Get the exposed primary key for the model.
     *
     * @return string
     */
    public function exposedKey(): string
    {
        return __PRIMARY_KEY__;
    }

    /**
     * @return string
     */
    public static function getExternalKey(): string
    {
        return __PRIMARY_KEY__;
    }

    /**
     * @return array
     */
    public function columns(): array
    {
        $visible = array_diff($this->getFillable(), $this->hidden);
        $keys = [$this->exposedKey(), $this->getKeyName()];
        $timestamps = [static::CREATED_AT, static::UPDATED_AT, static::DELETED_AT];
        $responsible = config('app.no-responsible')
            ? []
            : [static::CREATED_BY, static::UPDATED_BY, static::DELETED_BY];

        $columns = array_merge($keys, $visible, $timestamps, $responsible);
        $callback = function ($column) {
            if (isset($this->calculated[$column])) {
                return DB::raw("({$this->calculated[$column]}) as '{$column}'");
            }
            return $column;
        };
        return array_map($callback, $columns);
    }

    /**
     * Get the primary key for the model.
     *
     * @return string
     * @noinspection ReturnTypeCanBeDeclaredInspection
     */
    public function getKeyName()
    {
        return __BINARY_KEY__;
    }

    /**
     * {@inheritdoc}
     * @throws AuditingException
     * @noinspection DuplicatedCode
     */
    public function toAudit(): array
    {
        if (!$this->readyForAuditing()) {
            throw new AuditingException('A valid audit event has not been set');
        }

        $attributeGetter = $this->resolveAttributeGetter($this->auditEvent);

        if (!method_exists($this, $attributeGetter)) {
            throw new AuditingException(
                sprintf(
                    'Unable to handle "%s" event, %s() method missing',
                    $this->auditEvent,
                    $attributeGetter
                )
            );
        }

        $this->resolveAuditExclusions();

        [$old, $new] = $this->$attributeGetter();

        if ($this->getAttributeModifiers()) {
            foreach ($old as $attribute => $value) {
                $old[$attribute] = $this->modifyAttributeValue($attribute, $value);
            }

            foreach ($new as $attribute => $value) {
                $new[$attribute] = $this->modifyAttributeValue($attribute, $value);
            }
        }

        foreach ($old as $key => $value) {
            if (!is_binary($value)) {
                continue;
            }
            try {
                $raw = Common::decodeUuid($value);
                $old[$key] = $raw;
            } catch (Throwable $exception) {
                // silent is gold
            }
        }

        foreach ($new as $key => $value) {
            if (!is_binary($value)) {
                continue;
            }
            try {
                $raw = Common::decodeUuid($value);
                $new[$key] = $raw;
            } catch (Throwable $exception) {
                // silent is gold
            }
        }

        $morphPrefix = Config::get('audit.user.morph_prefix', 'user');

        $tags = implode(',', $this->generateTags());

        $user = $this->resolveUser();

        return $this->transformAudit(
            [
                'old_values' => $old,
                'new_values' => $new,
                'event' => $this->auditEvent,
                'auditable_id' => $this->id,
                'auditable_type' => $this->getMorphClass(),
                $morphPrefix . '_id' => $user->uuid ?? null,
                $morphPrefix . '_type' => $user ? $user->getMorphClass() : null,
                'url' => $this->resolveUrl(),
                'ip_address' => $this->resolveIpAddress(),
                'user_agent' => $this->resolveUserAgent(),
                'tags' => empty($tags) ? null : $tags,
            ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function transformAudit(array $data): array
    {
        if (isset($data['user_id']) && $data['user_id'] && !is_binary($data['user_id'])) {
            $data['user_id'] = static::encodeUuid($data['user_id']);
        }
        return $this->safeAttributes($data, ['user_id']);
    }

    /**
     * @return $this
     */
    public function counter(): self
    {
        if (!config('app.counter')) {
            return $this;
        }

        $this->counter = counter();
        return $this;
    }

    /**
     * @return void
     * @throws ErrorInvalidArgument
     */
    public function prepare(): void
    {
        $currencies = $this->currencies();
        $data = $this->getValues();
        foreach ($data as $field => $datum) {
            if (!in_array($field, $currencies, true)) {
                continue;
            }
            if ($datum instanceof Currency) {
                continue;
            }
            $this->setValue($field, Currency::fromValue($datum));
        }
    }

    /**
     * Resolve the custom caster class for a given key.
     *
     * @param  string  $key
     * @return mixed
     */
    protected function resolveCasterClass($key)
    {
        $castType = $this->getCasts()[$key];

        $arguments = [];

        if (is_string($castType) && strpos($castType, ':') !== false) {
            $segments = explode(':', $castType, 2);

            $castType = $segments[0];
            $arguments = explode(',', $segments[1]);
        }

        if (is_subclass_of($castType, Castable::class)) {
            $castType = $castType::castUsing($arguments);
        }

        if (is_object($castType)) {
            return $castType;
        }

        return new $castType(...$arguments);
    }

    /**
     * @param $property
     *
     * @return bool
     */
    protected function isEncoded($property): bool
    {
        $haystack = [$this->primaryKey];
        $haystack = array_merge($haystack, array_values($this->manyToOne()));
        $haystack = array_merge($haystack, $this->getEncoded());
        return in_array($property, $haystack, true);
    }

    /**
     * @return array|string[]
     */
    public function getDefaults(): array
    {
        return [];
    }
}
