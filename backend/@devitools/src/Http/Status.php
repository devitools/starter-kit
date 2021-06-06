<?php

declare(strict_types=1);

namespace Devitools\Http;

/**
 * Class Status
 *
 * @package Devitools\Http
 */
class Status
{
    /**
     * Continue
     *
     * @var integer
     */
    public const CODE_100 = 100;

    /**
     * Switching Protocols
     *
     * @var integer
     */
    public const CODE_101 = 101;

    /**
     * Processing
     *
     * @var integer
     */
    public const CODE_102 = 102;

    /**
     * Early Hints
     *
     * @var integer
     */
    public const CODE_103 = 103;

    /**
     * OK
     *
     * @var integer
     */
    public const CODE_200 = 200;

    /**
     * Created
     *
     * @var integer
     */
    public const CODE_201 = 201;

    /**
     * Accepted
     *
     * @var integer
     */
    public const CODE_202 = 202;

    /**
     * Non-Authoritative Information
     *
     * @var integer
     */
    public const CODE_203 = 203;

    /**
     * No Content
     *
     * @var integer
     */
    public const CODE_204 = 204;

    /**
     * Reset Content
     *
     * @var integer
     */
    public const CODE_205 = 205;

    /**
     * Partial Content
     *
     * @var integer
     */
    public const CODE_206 = 206;

    /**
     * Multi-Status
     * @var integer
     */
    public const CODE_207 = 207;

    /**
     * Already Reported
     *
     * @var integer
     */
    public const CODE_208 = 208;

    /**
     * IM Used
     *
     * @var integer
     */
    public const CODE_226 = 226;

    /**
     * Multiple Choices
     *
     * @var integer
     */
    public const CODE_300 = 300;

    /**
     * Moved Permanently
     *
     * @var integer
     */
    public const CODE_301 = 301;

    /**
     * Found
     *
     * @var integer
     */
    public const CODE_302 = 302;

    /**
     * See Other
     *
     * @var integer
     */
    public const CODE_303 = 303;

    /**
     * Not Modified
     *
     * @var integer
     */
    public const CODE_304 = 304;

    /**
     * Use Proxy
     *
     * @var integer
     */
    public const CODE_305 = 305;

    /**
     * Temporary Redirect
     *
     * @var integer
     */
    public const CODE_307 = 307;

    /**
     * Permanent Redirect
     *
     * @var integer
     */
    public const CODE_308 = 308;

    /**
     * Bad Request
     *
     * @var integer
     */
    public const CODE_400 = 400;

    /**
     * Unauthorized
     *
     * @var integer
     */
    public const CODE_401 = 401;

    /**
     * Payment Required
     *
     * @var integer
     */
    public const CODE_402 = 402;

    /**
     * Forbidden
     *
     * @var integer
     */
    public const CODE_403 = 403;

    /**
     * Not Found
     *
     * @var integer
     */
    public const CODE_404 = 404;

    /**
     * Method Not Allowed
     *
     * @var integer
     */
    public const CODE_405 = 405;

    /**
     * Not Acceptable
     *
     * @var integer
     */
    public const CODE_406 = 406;

    /**
     * Proxy Authentication Required
     *
     * @var integer
     */
    public const CODE_407 = 407;

    /**
     * Request Timeout
     *
     * @var integer
     */
    public const CODE_408 = 408;

    /**
     * Conflict
     *
     * @var integer
     */
    public const CODE_409 = 409;

    /**
     * Gone
     *
     * @var integer
     */
    public const CODE_410 = 410;

    /**
     * Length Required
     *
     * @var integer
     */
    public const CODE_411 = 411;

    /**
     * Precondition Failed
     *
     * @var integer
     */
    public const CODE_412 = 412;

    /**
     * Payload Too Large
     *
     * @var integer
     */
    public const CODE_413 = 413;

    /**
     * URI Too Long
     *
     * @var integer
     */
    public const CODE_414 = 414;

    /**
     * Unsupported Media Type
     *
     * @var integer
     */
    public const CODE_415 = 415;

    /**
     * Range Not Satisfiable
     *
     * @var integer
     */
    public const CODE_416 = 416;

    /**
     * Expectation Failed
     *
     * @var integer
     */
    public const CODE_417 = 417;

    /**
     * I\'m a teapot
     *
     * @var integer
     */
    public const CODE_418 = 418;

    /**
     * Misdirected Request
     *
     * @var integer
     */
    public const CODE_421 = 421;

    /**
     * Unprocessable Entity
     *
     * @var integer
     */
    public const CODE_422 = 422;

    /**
     * Locked
     *
     * @var integer
     */
    public const CODE_423 = 423;

    /**
     * Failed Dependency
     *
     * @var integer
     */
    public const CODE_424 = 424;

    /**
     * Too Early
     *
     * @var integer
     */
    public const CODE_425 = 425;

    /**
     * Upgrade Required
     *
     * @var integer
     */
    public const CODE_426 = 426;

    /**
     * Precondition Required
     *
     * @var integer
     */
    public const CODE_428 = 428;

    /**
     * Too Many Requests
     *
     * @var integer
     */
    public const CODE_429 = 429;

    /**
     * Request Header Fields Too Large
     *
     * @var integer
     */
    public const CODE_431 = 431;

    /**
     * Unavailable For Legal Reasons
     *
     * @var integer
     */
    public const CODE_451 = 451;

    /**
     * Internal Server Error
     *
     * @var integer
     */
    public const CODE_500 = 500;

    /**
     * Not Implemented
     *
     * @var integer
     */
    public const CODE_501 = 501;

    /**
     * Bad Gateway
     *
     * @var integer
     */
    public const CODE_502 = 502;

    /**
     * Service Unavailable
     *
     * @var integer
     */
    public const CODE_503 = 503;

    /**
     * Gateway Timeout
     *
     * @var integer
     */
    public const CODE_504 = 504;

    /**
     * HTTP Version Not Supported
     *
     * @var integer
     */
    public const CODE_505 = 505;

    /**
     * Variant Also Negotiates
     *
     * @var integer
     */
    public const CODE_506 = 506;

    /**
     * Insufficient Storage
     *
     * @var integer
     */
    public const CODE_507 = 507;

    /**
     * Loop Detected
     *
     * @var integer
     */
    public const CODE_508 = 508;

    /**
     * Not Extended
     *
     * @var integer
     */
    public const CODE_510 = 510;

    /**
     * Network Authentication Required
     *
     * @var integer
     */
    public const CODE_511 = 511;
}
