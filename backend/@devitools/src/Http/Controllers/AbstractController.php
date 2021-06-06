<?php

declare(strict_types=1);

namespace Devitools\Http\Controllers;

use Devitools\Http\Response\AnswerTrait;

/**
 * Class AbstractController
 *
 * @package Devitools\Http
 */
abstract class AbstractController extends Controller
{
    /**
     * @see AnswerTrait
     */
    use AnswerTrait;
}
