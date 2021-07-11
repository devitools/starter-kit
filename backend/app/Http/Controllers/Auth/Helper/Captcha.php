<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth\Helper;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use ReCaptcha\ReCaptcha;

/**
 * Trait Captcha
 *
 * @package App\Http\Controllers\Auth
 */
trait Captcha
{
    /**
     * @param string $recaptcha
     *
     * @return array|null
     */
    protected function checkRecaptcha(string $recaptcha): ?array
    {
        if (!$recaptcha) {
            return null;
        }

        $checker = new ReCaptcha(config('services.recaptcha.secretKey'));
        $remote = request()->ip();
        $response = $checker->verify($recaptcha, $remote);
        if (!$response->isSuccess()) {
            return $response->getErrorCodes();
        }
        return [];
    }

    /**
     * @param Request $request
     * @param Closure $callback
     *
     * @return mixed
     */
    protected function answerWithRecaptcha(Request $request, Closure $callback): mixed
    {
        $recaptcha = (string)$request->post('recaptcha');
        if (!$recaptcha) {
            return $this->answerFail(['captcha' => 'required']);
        }

        if (Cache::has($recaptcha)) {
            Cache::forget($recaptcha);
            return $callback($request);
        }

        $errors = $this->checkRecaptcha($recaptcha);
        if (count($errors)) {
            return $this->answerFail(['captcha' => 'invalid'], ['errors' => $errors]);
        }
        return $callback($request);
    }
}
