import Basic from './Basic'

import { Pagination } from '../../Agnostic/Helper/interfaces'
import { get, is, promisify, serialize, unSerialize, withoutSeparator } from '../../Util/general'

import { filterKey, searchKey } from 'src/settings/schema'
import { parseRestRecords } from 'src/settings/rest'

import { $store } from 'src/store'

/**
 * @class {Rest}
 */
export default abstract class Search extends Basic {
  /**
   * @param {Record<string, string | number>} parameters
   * @param {Array<string>} [filters] = []
   * @param {boolean} [trash] = false
   * @return {Promise<Pagination>}
   */
  paginate (parameters: Record<string, unknown>, filters?: string[], trash?: boolean): Promise<Pagination> {
    const { pagination, [filterKey]: filter, [searchKey]: where, raw } = parameters ?? {}

    const size = get(pagination, 'rowsPerPage', this.size)
    const sortBy = get(pagination, 'sortBy')
    const descending = get(pagination, 'descending')
    const page = get(pagination, 'page', 1)

    let sort
    if (sortBy) {
      const direction = descending ? 'desc' : 'asc'
      sort = `${sortBy}.${direction}`
    }

    if ($store.getters['app/getOffline'] || this.offline) {
      return this.searchOffline({ page, size, sort, filter, where, raw, trash })
    }

    return this.paginateParser({ page, size, sortBy, descending, sort, filter, where, raw, trash })
  }

  /**
   * @param {parameters: Record<string, number | string | boolean | unknown>} parameters
   * @protected
   * @return {Promise<Pagination>}
   */
  protected paginateParser (parameters: Record<string, number | string | boolean | unknown>) {
    const { page, size, sortBy, descending, sort, filter, where, raw, trash } = parameters ?? {}

    const parse = parseRestRecords({ rowsPerPage: size, sortBy, descending, page })
    return this
      .search({ page, size, sort, filter, where, raw, trash })
      .then((response) => parse(response))
  }

  /**
   * Ex.: query({ page, size, sort, filter, where })
   * @param {Object} parameters
   * @param {Object} config
   * @returns {Promise}
   */
  search (parameters = {}, config: Record<string, unknown> = {}) {
    const queryString = this.searchQueryString(parameters, '&')
    return this.get(`${this.getResource()}?${queryString}`, config)
  }

  /**
   * @param {Record<string, unknown>} parameters
   * @param {string} separator
   * @returns {string}
   */
  searchQueryString (parameters: Record<string, unknown> = {}, separator: string) {
    const elements = []
    const { raw, page, size, sort, filter, where, trash } = parameters ?? {}
    if (is(page)) {
      elements.push(`page=${page}`)
    }
    if (is(size)) {
      elements.push(`size=${size}`)
    }
    if (is(sort)) {
      elements.push(`sort=${sort}`)
    }
    if (is(trash)) {
      elements.push('trash=true')
    }
    if (is(filter)) {
      elements.push(`${filterKey}=${filter}`)
    }
    if (is(raw)) {
      elements.push(typeof raw === 'string' ? raw : serialize(raw))
    }
    if (is(where)) {
      elements.push(typeof where === 'string' ? where : serialize(where, searchKey))
    }
    return elements.join(separator)
  }

  /**
   * @param {Object} parameters
   * @returns {Promise<Pagination>}
   */
  searchOffline (parameters: Record<string, unknown>): Promise<Pagination> {
    const executor = (resolve: Function) => {
      const search = () => {
        // sort, raw, trash
        const { page, size: rowsPerPage, where, filter } = parameters ?? {}

        const records = this
          .getOfflineRecords()
          .filter((record: Record<string, unknown>) => {
            if (is(where)) {
              return this.searchOfflineWhere(record, String(where))
            }
            if (is(filter)) {
              return this.searchOfflineFilter(record, String(filter))
            }
            return true
          })

        const rowsNumber = records.length
        const pagesNumber = Math.ceil(rowsNumber / Number(rowsPerPage))
        const offset = (Number(page) - 1) * Number(rowsPerPage)
        const rows = records.slice(offset, offset + Number(rowsPerPage))

        resolve({ rows, rowsPerPage, rowsNumber, pagesNumber, page })
      }
      window.setTimeout(search, 100)
    }
    return new Promise(executor)
  }

  /**
   * @param {Record<string, unknown>} record
   * @param {string} where
   * @returns {boolean}
   */
  searchOfflineWhere (record: Record<string, unknown>, where: string) {
    const unSerialized: Record<string, unknown> = unSerialize(where, searchKey)
    for (const key in unSerialized) {
      if (!unSerialized.hasOwnProperty(key)) {
        continue
      }
      const value = withoutSeparator(unSerialized[key])
      if (!String(record[key]).toLowerCase().includes(String(value).toLowerCase())) {
        return false
      }
    }
    return true
  }

  /**
   * @param {Record<string, unknown>} record
   * @param {string} filter
   * @returns {boolean}
   */
  searchOfflineFilter (record: Record<string, unknown>, filter: string) {
    for (const field in record) {
      if (!record.hasOwnProperty(field)) {
        continue
      }
      // @ts-ignore
      if (!this.filterable.includes(field)) {
        continue
      }
      if (String(record[field]).toLowerCase().includes(String(filter).toLowerCase())) {
        return true
      }
    }
    return false
  }

  /**
   * @param {Record<string, string | number>} parameters
   * @param {Array<string>} [filters] = []
   * @return {Promise<unknown>}
   */
  download (parameters: Record<string, unknown>, filters?: string[]): Promise<unknown> {
    const { pagination, [filterKey]: filter, [searchKey]: where, raw } = parameters ?? {}

    const sortBy = get(pagination, 'sortBy')
    const descending = get(pagination, 'descending')

    let sort
    if (sortBy) {
      const direction = descending ? 'desc' : 'asc'
      sort = `${sortBy}.${direction}`
    }

    if ($store.getters['app/getOffline'] || this.offline) {
      return promisify({}, 1)
    }

    const queryString = this.searchQueryString({ sort, filter, where, raw }, '&')
    const path = `${this.getResource()}/download/csv`
    const config = { responseType: 'blob', notExtractData: true }
    return this.get(`${path}?${queryString}`, config)
  }
}
