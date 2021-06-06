<?php

declare(strict_types=1);

namespace Devitools\Http\Controllers\Rest;

use Devitools\Exceptions\ErrorValidation;
use Devitools\Http\Support\Levels;
use Devitools\Persistence\Filter\Connectors;
use Devitools\Persistence\Filter\Filters;
use Devitools\Persistence\Filter\FilterValue;
use Devitools\Persistence\RepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Php\JSON;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

use function count;
use function Devitools\Helper\error;
use function explode;
use function is_array;
use function is_callable;
use function is_numeric;
use function is_string;

/**
 * Trait Search
 *
 * @package Devitools\Http\Controllers\Rest
 * @method RepositoryInterface repository()
 */
trait Search
{
    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        $this->grant($this->repository()->domain(), Levels::LEVEL_INDEX);

        // page=1&size=10
        $page = $request->get('page', 1);
        $limit = $request->get('size', 25);
        $trash = $request->get('trash') === 'true';
        $sort = $request->get('sort');
        $filter = $request->get('filter');
        $where = $request->get('where');

        $offset = ($page - 1) * $limit;

        $filters = $this->parseSearch($filter, $where);
        $options = [
            'filters' => $filters,
            'offset' => $offset,
            'limit' => $limit,
            'sorter' => $this->parseSorter($sort)
        ];
        return $this->resolveSearch($options, $trash);
    }

    /**
     * @param array $options
     * @param bool $trash
     *
     * @return JsonResponse
     */
    protected function resolveSearch(array $options, bool $trash): JsonResponse
    {
        $data = $this->resolveSearchData($options, $trash);
        $meta = $this->resolveSearchMeta($options, $trash);
        return $this->answerSuccess($data, $meta);
    }

    /**
     * @param array $options
     * @param bool $trash
     *
     * @return array
     */
    protected function resolveSearchData(array $options, bool $trash): array
    {
        return $this->repository()->search($options, $trash);
    }

    /**
     * @param array $options
     * @param bool $trash
     *
     * @return array
     */
    protected function resolveSearchMeta(array $options, bool $trash): array
    {
        $filters = $options['filters'] ?? [];
        $total = $this->repository()->count($filters, $trash);
        return ['total' => $total];
    }

    /**
     * @param Request $request
     * @param string $format
     *
     * @return BinaryFileResponse
     * @throws ErrorValidation
     */
    public function download(Request $request, string $format = 'csv'): BinaryFileResponse
    {
        $this->grant($this->repository()->domain(), Levels::LEVEL_INDEX);

        $labels = $request->get('labels');

        $sort = $request->get('sort');
        $filter = $request->get('filter');
        $where = $request->get('where');

        $filters = $this->parseSearch($filter, $where);
        $options = [
            'filters' => $filters,
            'offset' => 0,
            'limit' => 0,
            'sorter' => $this->parseSorter($sort)
        ];
        $data = $this->repository()->search($options);

        if ($format === 'csv') {
            return $this->resolveDownloadCommaSeparatedValues($labels, $data);
        }

        throw new ErrorValidation([error('format', 'invalid', $format)]);
    }

    /**
     * @param string|null $filter
     * @param array|null $where
     *
     * @return array
     */
    protected function parseSearch(?string $filter, ?array $where): array
    {
        if (!$filter && !$where) {
            return [];
        }
        if ($where) {
            return $this->parseSearchWhere($where, $this->repository()->getManyToOne());
        }
        return $this->parseSearchFast($this->repository()->getFilterable(), $filter);
    }

    /**
     * @param array|null $where
     * @param array $manyToOne
     *
     * @return array
     */
    protected function parseSearchWhere(?array $where, array $manyToOne): array
    {
        if (!is_array($where)) {
            return [];
        }
        $filters = [];
        foreach ($where as $field => $properties) {
            $operator = Filters::EQUAL;
            $pieces = (array)explode(Filters::SEPARATION_OPERATOR, $properties);
            $value = $pieces[0] ?? null;
            if (count($pieces) > 1) {
                [$operator, $value] = $pieces;
            }

            if (!isset($manyToOne[$field])) {
                $filters[$field] = FilterValue::build($value, $operator);
                continue;
            }

            $target = $manyToOne[$field];
            $reference = JSON::decode($value, true);
            $value = $reference[__PRIMARY_KEY__] ?? null;
            if (!$value) {
                continue;
            }

            $operator = Filters::EQUAL;
            $value = Uuid::fromString($value)->getBytes();
            $filters[$target] = FilterValue::build($value, $operator);
        }
        return $filters;
    }

    /**
     * @param array $fields
     * @param string|null $filter
     *
     * @return array
     */
    protected function parseSearchFast(array $fields, ?string $filter): array
    {
        if (!$filter || !count($fields)) {
            return [];
        }
        $filters = [];
        foreach ($fields as $field => $operator) {
            if (is_numeric($field)) {
                $field = $operator;
                $operator = Filters::LIKE;
            }
            $filters[$field] = FilterValue::build($filter, $operator, Connectors::OR);
        }
        return $filters;
    }

    /**
     * @param string|null $sort
     *
     * @return array|null
     */
    protected function parseSorter(?string $sort): ?array
    {
        if (!$sort) {
            return null;
        }
        $pieces = (array)explode('.', $sort);
        if (!isset($pieces[0], $pieces[1])) {
            return null;
        }
        [$key, $value] = $pieces;
        return [$key => $value];
    }

    /**
     * @param array $labels
     * @param array $data
     *
     * @return BinaryFileResponse
     */
    protected function resolveDownloadCommaSeparatedValues(array $labels, array $data): BinaryFileResponse
    {
        $name = uniqid('download-', false) . '.csv';
        $filename = storage_path($name);
        $headers = [
            'Content-type' => 'text/csv',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
            'Context' => $name,
        ];

        $handle = fopen($filename, 'wb+');
        fputcsv($handle, array_values($labels));

        $keys = array_keys($labels);
        foreach ($data as $datum) {
            $row = $this->parseDownloadCommaSeparatedValuesRow($keys, $datum);
            fputcsv($handle, $row);
        }

        fclose($handle);

        return response()->download($filename, $name, $headers)->deleteFileAfterSend();
    }

    /**
     * @param array $keys
     * @param array $datum
     *
     * @return array
     */
    protected function parseDownloadCommaSeparatedValuesRow(array $keys, array $datum): array
    {
        $row = [];
        foreach ($keys as $key) {
            $fields = $this->parseDownloadCommaSeparatedValuesContent($key, $datum);
            $row[] = $fields;
        }
        return $row;
    }

    /**
     * @param string $key
     * @param array $datum
     *
     * @return bool|float|int|string|null
     */
    protected function parseDownloadCommaSeparatedValuesContent(string $key, array $datum)
    {
        $value = $datum[$key] ?? null;
        if (is_scalar($value)) {
            return $value;
        }

        $downloadable = $this->repository()->getDownloadable();
        if (!isset($downloadable[$key])) {
            return null;
        }

        $relationship = $downloadable[$key] ?? config('devitools.schema.displayKey', 'name');
        if (is_string($relationship)) {
            return $value[$relationship] ?? null;
        }
        if (is_callable($relationship)) {
            return $relationship($datum);
        }

        return null;
    }
}
