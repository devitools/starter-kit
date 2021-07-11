<?php

declare(strict_types=1);

namespace Devitools\Http\Controllers;

use Devitools\Persistence\RepositoryInterface;

/**
 * Class AbstractPersistenceController
 *
 * @package Devitools\Http
 */
class AbstractPersistenceController extends AbstractController
{
    /**
     * @var RepositoryInterface
     */
    protected $repository;

    /**
     * AbstractPersistenceController constructor.
     *
     * @param RepositoryInterface $repository
     */
    public function __construct(RepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return RepositoryInterface
     */
    final protected function repository(): RepositoryInterface
    {
        return $this->repository;
    }
}
