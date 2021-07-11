import axios from 'axios'
import { QIcon } from 'quasar'

import { $store } from 'src/store'
import { downloadFile } from 'src/settings/storage'

const currency = process.env.VUE_APP_CURRENCY

/**
 * @type {{prefix: string, masked: boolean, precision: number, decimal: string, thousands: string, suffix: string, fallback: string}}
 */
export const DEFAULT_CURRENCY = Object.freeze({
  decimal: ',',
  thousands: '.',
  prefix: `${currency} `,
  suffix: '',
  precision: 2,
  masked: false,
  fallback: ' - '
})

/**
 * @type {Object}
 */
export const home = { is: QIcon, attrs: { name: 'important_devices' } } // home_work, desktop_windows

/**
 * @type {number}
 */
export const tableOuterHeight = 250

/**
 * @type {number}
 */
export const tableMinRowsPerPage = 10

/**
 * @type {Object}
 */
export const attrs = {
  dense: true,
  clearable: true,
  outlined: true,
  uppercase: false,
  useReadonly: true,
  autocomplete: 'new-password'
}

/**
 * @param value
 * @returns {string}
 */
export const parseOutputUpperCase = (value) => typeof value === 'string' ? value.toUpperCase() : value

const boolean = {
  useReadonly: false,
  'toggle-indeterminate': false,
  'true-value': true,
  'false-value': false,
  value: false
}

// noinspection SpellCheckingInspection
/**
 * @type {Record<string, unknown>}
 */
export default {
  input: {
    is: 'q-input',
    attrs: { maxlength: 255, ...attrs },
    parseOutput: parseOutputUpperCase
  },
  plan: {
    is: 'q-input',
    attrs: { maxlength: 255, ...attrs }
  },
  number: {
    is: 'q-input',
    attrs: { type: 'number', ...attrs }
  },
  password: {
    is: 'AppPassword',
    attrs: { type: 'password', maxlength: 255, ...attrs }
  },
  email: {
    is: 'q-input',
    attrs: { type: 'email', maxlength: 255, ...attrs }
  },
  text: {
    is: 'q-input',
    attrs: { type: 'textarea', rows: 4, maxlength: 65000, ...attrs }
  },
  editor: {
    is: 'q-editor',
    attrs: { ...attrs, value: '', maxlength: 65000 },
    parseInput: (value) => typeof value === 'undefined' ? '' : value
  },
  checkbox: {
    is: 'q-checkbox',
    attrs: { ...attrs, ...boolean, value: false }
  },
  radio: {
    is: 'q-option-group',
    attrs: { inline: true, ...attrs, useReadonly: false, options: [] }
  },
  select: {
    is: 'q-select',
    attrs: { ...attrs, options: [] }
  },
  toggle: {
    is: 'q-toggle',
    attrs: { ...attrs, ...boolean, options: [] }
  },
  remote: {
    is: 'AppSelectRemoteSingle',
    attrs: { ...attrs }
  },
  remoteMultiple: {
    is: 'AppSelectRemoteMultiple',
    attrs: { ...attrs }
  },
  date: {
    is: 'AppDate',
    attrs: { ...attrs, mask: '##/##/####', format: 'YYYY-MM-DD', display: 'DD/MM/YYYY' }
  },
  datetime: {
    is: 'AppDatetime',
    attrs: { ...attrs, mask: '##/##/#### ##:##', format: 'YYYY-MM-DDTHH:mm', display: 'DD/MM/YYYY HH:mm' }
  },
  currency: {
    is: 'AppCurrency',
    attrs: { ...attrs, value: 0, ...DEFAULT_CURRENCY }
  },
  percentage: {
    is: 'AppCurrency',
    attrs: {
      ...attrs,
      decimal: '.',
      thousands: ',',
      prefix: '',
      suffix: '%',
      precision: 2,
      masked: false,
      fallback: ' - ',
      value: 0
    }
  },
  numeric: {
    is: 'AppNumeric',
    attrs: { ...attrs }
  },
  image: {
    is: 'AppCloudinaryImage',
    attrs: () => $store.getters['auth/getCloudinaryCredentials']
  },
  file: {
    is: 'AppAwsFile',
    attrs: () => $store.getters['auth/getAwsCredentials']
  },
  fileSync: {
    is: 'AppFileSync',
    attrs: { ...attrs, clearable: true, downloadFile }
  },
  phoneInternational: {
    is: 'AppPhoneInternational',
    attrs: {
      geoIpLookup: async () => {
        const token = process.env.VUE_APP_IPINFO_TOKEN
        try {
          const { data: response } = await axios(`https://ipinfo.io/json?token=${token}`)
          return (response && response.country) ? response.country : ''
        } catch (e) {
          // silent is gold
        }
        return ''
      }
    }
  }
}
