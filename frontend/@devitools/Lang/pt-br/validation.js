import { validation } from '../en-us'

/**
 * @link https://github.com/enniosousa/laravel-5.5-pt-BR-localization/blob/master/validation.php
 */
export default {
  ...validation,
  required: 'Campo obrigatório',
  minLength: 'Mínimo de {min} caracteres',
  maxLength: 'Máximo de {max} caracteres',
  minValue: 'O valor mínimo permitido é {min}',
  maxValue: 'O valor máximo permitido é {max}',
  between: 'O valor informado ultrapassa os limites',
  alpha: 'O valor deve ser uma letra',
  alphaNum: 'O valor deve ser um alfa numérico',
  numeric: 'O valor deve ser um número válido',
  integer: 'O valor deve ser um número inteiro',
  decimal: 'O valor deve ser um número decimal',
  email: 'O valor informado deve ser um email válido',
  ipAddress: 'O valor deve ser um IP válido',
  macAddress: 'O valor deve ser um MAC address válido',
  password: 'Senha deve conter letras, números e pelo menos 6 caracteres',
  notFound: 'Registro não encontrado',
  maxFileSize: 'O arquivo não deve ser maior que {size}kb',
  url: 'O valor deve ser uma URL válida',
  date: 'O valor deve ser uma data válida',

  requiredIf: 'configure [validations.{field}.requiredIf] no arquivo de i18n do schema',
  requiredUnless: 'configure [validations.{field}.requiredUnless] no arquivo de i18n do schema',
  sameAs: 'configure [validations.{field}.sameAs] no arquivo de i18n do schema',
  or: 'configure [validations.{field}.or] no arquivo de i18n do schema',
  and: 'configure [validations.{field}.and] no arquivo de i18n do schema',
  not: 'configure [validations.{field}.not] no arquivo de i18n do schema',
  withParams: 'configure [validations.{field}.withParams] no arquivo de i18n do schema'
}
