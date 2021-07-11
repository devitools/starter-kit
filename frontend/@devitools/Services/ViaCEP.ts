import { replacement } from '../Util/string'

/**
 * @interface {ViaCEPResponse}
 */
interface ViaCEPResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  unidade: string
  ibge: string
  gia: string
  erro?: boolean
}

export type Localization = {
  zip: string
  address: string
  complement: string
  neighborhood: string
  city: string
  state: string
  ibge: string
  gia: string
}

/**
 * @link https://viacep.com.br
 *
 * @type {ViaCEP}
 */
export default class ViaCEP {
  /**
   * @var {string}
   */
  uri = 'https://viacep.com.br/ws/{cep}/json?callback=callbackViaCEP'

  /**
   * @returns {ViaCEP}
   */
  static build () {
    return new this()
  }

  /**
   * @param {string} cep
   */
  query (cep: string): Promise<Localization> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      window.callbackViaCEP = function (response: ViaCEPResponse) {
        if (response.erro) {
          reject()
          return
        }

        resolve({
          zip: response.cep,
          address: response.logradouro,
          complement: response.complemento,
          neighborhood: response.bairro,
          city: response.localidade,
          state: response.uf,
          ibge: response.ibge,
          gia: response.gia
        })
      }
      const request = document.createElement('script')
      request.src = replacement(this.uri, { cep })
      document.body.appendChild(request)
    })
  }
}
