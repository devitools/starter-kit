<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Domains\Admin\User\UserRepository;
use App\Domains\Auth\Login;
use App\Domains\Registration\Athlete;
use App\Domains\Registration\Athlete\AthleteRepository;
use Devitools\Exceptions\ErrorExternalIntegration;
use Devitools\Exceptions\ErrorInvalidArgument;
use Devitools\Exceptions\ErrorUserForbidden;
use Devitools\Http\Response\AnswerTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class Update
 *
 * @package App\Http\Controllers\Auth
 */
class Update
{
    use AnswerTrait;

    /**
     * @param Request $request
     * @param AthleteRepository $athleteRepository
     * @param UserRepository $userRepository
     *
     * @return JsonResponse
     * @throws ErrorUserForbidden
     * @throws ErrorExternalIntegration
     * @throws ErrorInvalidArgument
     */
    public function __invoke(
        Request $request,
        AthleteRepository $athleteRepository,
        UserRepository $userRepository
    ): JsonResponse {
        /** @var Login $login */
        $login = auth()->user();
        if (!$login) {
            throw new ErrorUserForbidden(['session' => 'required']);
        }

        /** @noinspection PhpUndefinedFieldInspection */
        $user = $userRepository->findById($login->usu_codigo);
        $payload = $request->all();

        $userId = (string)$user->getPrimaryKeyValue();
        $userData = [
            'usu_nome' => $payload['nome'],
            'usu_email' => $payload['email'],
        ];
        if (isset($payload['senha'])) {
            $userData['usu_password'] = $payload['senha'];
        }
        if (isset($payload['confirmacao'])) {
            $userData['usu_confirmacao'] = $payload['confirmacao'];
        }
        $userRepository->update($userId, $userData);

        /** @noinspection PhpUndefinedFieldInspection */
        $athlete = $athleteRepository
            ->find([Athlete::prefixed('cod_USUARIO') => (string)$login->usu_codigo])
            ->first();

        if (!$athlete) {
            return $this->answerSuccess([]);
        }

        /** @var Athlete $athlete */
        $athleteId = (string)$athlete->getPrimaryKeyValue();
        $athleteData = [
            'atl_nome' => $payload['nome'],
            'atl_apelido' => $payload['apelido'],
            'atl_nacionalidade' => $payload['nacionalidade'],
            'atl_rg' => $payload['rg'],
            'atl_cpf' => $payload['cpf'],
            'atl_documento' => $payload['documento'],
            'atl_email' => $payload['email'],
            'atl_foto' => $payload['foto'],
            'atl_data_nascimento' => $payload['data_nascimento'],
            'atl_celular' => $payload['celular'],
            'atl_cep' => $payload['cep'],
            'atl_endereco' => $payload['endereco'],
            'atl_bairro' => $payload['bairro'],
            'atl_cidade' => $payload['cidade'],
        ];
        $athleteRepository->update($athleteId, $athleteData);

        return $this->answerSuccess([]);
    }
}
