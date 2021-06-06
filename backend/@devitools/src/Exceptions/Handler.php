<?php

declare(strict_types=1);

namespace Devitools\Exceptions;

use Devitools\Auth\Login;
use Devitools\Http\Response\AnswerTrait;
use Devitools\Http\Status;
use ForceUTF8\Encoding;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Sentry\State\Scope;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Throwable;

use function in_array;
use function is_array;
use function Sentry\configureScope;

/**
 * Class Handler
 *
 * @package Devitools\Exceptions
 */
class Handler extends ExceptionHandler
{
    /**
     * @see AnswerTrait
     */
    use AnswerTrait;

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
        'passwordConfirmation',
    ];

    /**
     * Capture errors and send to error tracker with Sentry
     *
     * @requires sentry/sentry-laravel
     * Use "composer require sentry/sentry-laravel" to use Sentry
     *
     * @param Throwable $exception
     */
    public static function capture(Throwable $exception): void
    {
        configureScope(static function (Scope $scope) use ($exception): void {
            # capture the user
            try {
                $user = auth()->user();
                if ($user) {
                    /** @var Login $user */
                    $scope->setUser($user->toArray());
                }
            } catch (Throwable $e) {
            }

            # capture the URL
            $scope->setExtra('url', url()->current());

            if (!$exception instanceof ErrorGeneral) {
                return;
            }
            $scope->setExtra('details', $exception->getDetails());
        });
        app('sentry')->captureException($exception);
    }


    /**
     * Report or log an exception.
     *
     * @param Throwable $e
     *
     * @return void
     * @throws Throwable
     */
    public function report(Throwable $e)
    {
        if ($this->shouldReport($e) && app()->bound('sentry')) {
            static::capture($e);
        }
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param Throwable $e
     *
     * @return Response
     * @throws Throwable
     */
    public function render($request, Throwable $e)
    {
        $route = $request->route();
        if (!$route || in_array('api', $route->middleware(), true)) {
            $request->headers->set('Accept', 'application/json');
        }

        if ($e instanceof ErrorGeneral) {
            return $this->answerWith($e);
        }

        if ($e instanceof UnauthorizedHttpException) {
            $message = 'Unauthorized';
            $data = [];
            if ($e->getMessage() === 'Token has expired') {
                $data['token'] = 'expired';
            }
            return $this->answerError($message, Status::CODE_401, $data);
        }

        if ($e instanceof QueryException) {
            $bindings = $e->getBindings();
            if (!is_array($bindings)) {
                $bindings = [$bindings];
            }
            foreach ($bindings as $key => $binding) {
                $bindings[$key] = Encoding::fixUTF8($binding);
            }

            $message = 'Internal Error';
            $data = [];
            if (env('APP_DEBUG')) {
                $message = Encoding::fixUTF8($e->getMessage());
                $data = [
                    'sql' => $e->getSql(),
                    'bindings' => $bindings,
                ];
            }
            return $this->answerError($message, Status::CODE_500, $data);
        }

        return parent::render($request, $e);
    }

    /**
     * @param ErrorGeneral $exception
     *
     * @return JsonResponse
     */
    protected function answerWith(ErrorGeneral $exception): JsonResponse
    {
        $code = $exception->getStatusCode();
        $meta = ['errors' => $exception->getDetails()];

        if ($code >= 400 && $code < 500) {
            return $this->answerFail(null, $meta, $code);
        }

        $message = $exception->getMessage();
        $debug = '';
        if (env('APP_DEBUG')) {
            $debug = utf8_encode($exception->getTraceAsString());
        }
        return $this->answerError($message, $code, $meta, false, $debug);
    }
}
