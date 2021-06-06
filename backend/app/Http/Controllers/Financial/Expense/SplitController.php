<?php

declare(strict_types=1);

namespace App\Http\Controllers\Financial\Expense;

use App\Domains\Financial\Expense\Split;
use App\Domains\Financial\Expense\Split\SplitRepository;
use App\Domains\Financial\Expense\Split\SplitStatus;
use Devitools\Exceptions\ErrorGeneral;
use Devitools\Exceptions\ErrorResourceIsGone;
use Devitools\Exceptions\ErrorUserForbidden;
use Devitools\Exceptions\ErrorValidation;
use Devitools\Http\Controllers\AbstractPersistenceController;
use Devitools\Http\Controllers\Rest\Search;
use Devitools\Http\Support\Levels;
use Devitools\Http\Support\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

use function Devitools\Helper\idToArray;

/**
 * Class SplitController
 *
 * @package App\Http\Controllers\Financial\Expense
 */
class SplitController extends AbstractPersistenceController
{
    /**
     * Support
     */
    use Permission;

    /**
     * Basic operations
     */
    use Search;

    /**
     * SplitController constructor.
     *
     * @param SplitRepository $repository
     */
    public function __construct(SplitRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws ErrorUserForbidden
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
        if (!is_array($where)) {
            $where = [];
        }

        $parameters = $request->route()->parameters();
        $expenseId = $parameters['expense'] ?? '';
        if ($expenseId) {
            $expenseId = Uuid::fromString($expenseId)->getBytes();
        }
        $where['expenseId'] = $expenseId;

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
     * @param Request $request
     * @param string $expense
     * @param string $id
     *
     * @return JsonResponse
     * @throws ErrorResourceIsGone
     * @throws ErrorUserForbidden
     */
    public function read(Request $request, string $expense, string $id): JsonResponse
    {
        /** @var SplitRepository $repository */
        $repository = $this->repository();
        $this->grant($repository->domain(), Levels::LEVEL_VIEW);

        $trash = $request->get('trash') === 'true';
        $options = [
            'expenseId' => Uuid::fromString($expense)->getBytes(),
            'id' => $id,
        ];
        $data = $repository
            ->find($options, [], 0, 1, $trash)
            ->first();
        if ($data === null) {
            throw new ErrorResourceIsGone([__PRIMARY_KEY__ => $id]);
        }

        return $this->answerSuccess($data);
    }

    /**
     * @param Request $request
     * @param string $id
     * @param string $expense
     *
     * @return JsonResponse
     * @throws ErrorResourceIsGone
     * @throws ErrorUserForbidden
     * @throws ErrorValidation
     */
    public function update(Request $request, string $expense, string $id): JsonResponse
    {
        /** @var SplitRepository $repository */
        $repository = $this->repository();
        $this->grant($repository->domain(), Levels::LEVEL_EDIT);

        $options = [
            'expenseId' => Uuid::fromString($expense)->getBytes(),
            'id' => $id,
        ];

        /** @var Split $split */
        $split = $repository
            ->find($options, [], 0, 1, false)
            ->first();
        if ($split === null) {
            throw new ErrorResourceIsGone([__PRIMARY_KEY__ => $id]);
        }

        if ($split->getValue('status') === SplitStatus::PAID) {
            throw new ErrorValidation(['status' => 'already-paid']);
        }

        $data = $request->all();
        if (!$data) {
            return $this->answerFail(['payload' => 'empty']);
        }
        $details = [__PRIMARY_KEY__ => $id];

        $data['status'] = SplitStatus::PAID;

        $updated = $repository->update($id, $data);
        if ($updated) {
            return $this->answerSuccess(['ticket' => $updated]);
        }
        if ($updated === null) {
            throw new ErrorResourceIsGone($details);
        }
        return $this->answerFail($details);
    }

    /**
     * @param string $expense
     * @param string $id
     *
     * @return JsonResponse
     * @throws ErrorResourceIsGone
     * @throws ErrorUserForbidden
     * @throws ErrorValidation
     */
    public function destroy(string $expense, string $id): JsonResponse
    {
        /** @var SplitRepository $repository */
        $repository = $this->repository();
        $this->grant($repository->domain(), Levels::LEVEL_REMOVE);

        $ids = idToArray($id);

        $executed = [];
        foreach ($ids as $detail) {
            $options = [
                'expenseId' => Uuid::fromString($expense)->getBytes(),
                'id' => $detail,
            ];
            /** @var Split $split */
            $split = $repository
                ->find($options, [], 0, 1, false)
                ->first();
            if ($split === null) {
                throw new ErrorResourceIsGone([__PRIMARY_KEY__ => $id]);
            }

            if ($split->getValue('status') === SplitStatus::OPEN) {
                throw new ErrorValidation(['status' => 'already-open']);
            }

            $data['bankAccountId'] = null;
            $data['voucher'] = null;
            $data['paymentDate'] = null;
            $data['status'] = SplitStatus::OPEN;
            $updated = $repository->update($detail, $data);
            if (!$updated) {
                continue;
            }
            $executed[] = $detail;
        }

        if (count($ids) !== count($executed)) {
            throw new ErrorResourceIsGone([__PRIMARY_KEY__ => array_diff($ids, $executed)]);
        }
        return $this->answerSuccess(['ticket' => $ids]);
    }
}
