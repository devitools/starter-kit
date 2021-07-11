<?php

declare(strict_types=1);

namespace Devitools\Report;

use Devitools\Report\Fragments\Getter;
use Devitools\Report\Fragments\Where;
use Illuminate\Contracts\View\Factory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\View\View;
use Php\JSON;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Class AbstractReport
 *
 * @package Report
 */
abstract class AbstractReport
{
    /**
     */
    use Getter;
    use Where;

    /**
     * @var string
     */
    protected string $layout = 'portrait';

    /**
     * @var bool
     */
    protected bool $printing = false;

    /**
     * @var array
     */
    private array $info;

    /**
     * AbstractReport constructor.
     *
     * @param string $user
     * @param bool $printing
     */
    public function __construct(string $user, bool $printing = false)
    {
        $this->user = $user;
        $this->printing = $printing;
    }

    /**
     * @param string $user
     * @param bool $printing
     *
     * @return static
     */
    public static function build(string $user, bool $printing = false)
    {
        return new static($user, $printing);
    }

    /**
     * @param array $filters
     *
     * @return array
     */
    protected function normalizeInfo(array &$filters): array
    {
        if (!isset($filters['__@info'])) {
            return [];
        }

        $map = static function ($info) {
            return JSON::decode($info, false);
        };
        $decoded = array_map($map, $filters['__@info']);
        $info = array_filter($decoded, static function ($info) {
            return isset($info->value);
        });
        unset($filters['__@info']);
        return $info;
    }

    /**
     * @param array $filters
     *
     * @return array
     */
    protected function normalizeFilters(array $filters): array
    {
        $callback = static function ($info) {
            if (isset($info[__PRIMARY_KEY__]) || isset($info['value'])) {
                return true;
            }
            if (is_scalar($info)) {
                return (string)$info !== '';
            }
            return (bool)($info->value ?? false);
        };
        $map = static function ($element) {
            return $element[__PRIMARY_KEY__] ?? $info['value'] ?? $element;
        };
        return array_map($map, array_filter($filters, $callback));
    }

    /**
     * @param array $filters
     * @param string $type
     *
     * @return mixed
     */
    final public function execute(array $filters, string $type = 'html')
    {
        require __DIR__ . '/../Helper/report.php';

        if ($type === 'csv') {
            return $this->csv($filters);
        }
        return $this->html($filters);
    }

    /**
     * @param array $filters
     *
     * @return string
     */
    private function html(array $filters): string
    {
        $this->info = $this->normalizeInfo($filters);
        $this->filters = $this->normalizeFilters($filters);
        $this->collection = $this->parseCollection($this->fetch($this->filters));

        return $this->renderHTML($this->template());
    }

    /**
     * @param array $filters
     *
     * @return StreamedResponse
     */
    protected function csv(array $filters): StreamedResponse
    {
        $this->info = $this->normalizeInfo($filters);
        $this->filters = $this->normalizeFilters($filters);
        $this->collection = $this->parseCollection($this->fetch($this->filters), 'csv');

        return $this->renderCSV();
    }

    /**
     * @param array $filters
     *
     * @return array
     */
    protected function fetch(array $filters): array
    {
        return DB::select((string)DB::raw($this->instruction($filters)), $filters);
    }

    /**
     * @param array $collection
     * @param string $type
     *
     * @return array
     */
    protected function parseCollection(array $collection, string $type = 'html'): array
    {
        return $collection;
    }

    /**
     * @return array|null
     */
    protected function parseHeader(): ?array
    {
        return null;
    }

    /**
     * @param $row
     *
     * @return array
     */
    protected function parseRow($row): array
    {
        return (array)$row;
    }

    /**
     * @param array $filters
     *
     * @return string
     */
    abstract protected function instruction(array &$filters): string;

    /**
     * @return string
     */
    abstract protected function template(): string;

    /**
     * @param string $template
     * @param array $parameters
     *
     * @return false|Factory|View|string
     */
    final protected function renderHTML(string $template, array $parameters = [])
    {
        $base = [
            'layout' => $this->layout,
            'printing' => $this->printing,
            'title' => $this->title,
            'collection' => $this->collection,
            'info' => $this->info,
            'user' => $this->user,
        ];
        $data = array_merge($base, $parameters);
        return (string)view($template, $data);
    }

    /**
     * @param array $options
     *
     * @return StreamedResponse
     */
    final protected function renderCSV(array $options = []): StreamedResponse
    {
        $delimiter = $options['delimiter'] ?? ';';
        $enclosure = $options['enclosure'] ?? '"';
        $filename = $options['filename'] ?? '';

        $callback = function () use ($delimiter, $enclosure) {
            $header = $this->parseHeader();
            $file = fopen('php://output', 'wb');
            if ($header) {
                fputcsv($file, $header, $delimiter, $enclosure);
            }

            foreach ($this->collection as $record) {
                fputcsv($file, $this->parseRow($record), $delimiter, $enclosure);
            }
            fclose($file);
        };

        $headers = [
            'content-type' => 'text/csv',
            'content-disposition' => "attachment; filename={$filename}",
            'pragma' => 'no-cache',
            'cache-control' => 'must-revalidate, post-check=0, pre-check=0',
            'expires' => '0'
        ];
        if ($filename) {
            $headers['x-suggested-filename'] = $filename;
        }

        return Response::stream($callback, 200, $headers);
    }
}
