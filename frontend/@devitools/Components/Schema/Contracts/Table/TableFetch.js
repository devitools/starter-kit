import { exportFile } from 'quasar'

import { filterKey, searchKey } from 'src/settings/schema'
import { delayLoading } from 'src/settings/rest'

import { is } from '../../../../Util/general'

/**
 * @mixin {TableFetch}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {boolean|number} wait
     * @param {string} [message]
     */
    loadingShow (wait = true, message = undefined) {
      this.loading = true
      let delay = wait === true ? delayLoading(this) : Number(wait || 0)
      if (this.data.length) {
        delay = 0
      }
      this.$q.loading.show({ delay, message })
    },
    /**
     */
    loadingHide () {
      this.$q.loading.hide()
      this.loading = false
    },
    /**
     * @return {number}
     */
    parsePageToFetch () {
      if (!this.embed) {
        return this.$route.query.page ? Number(this.$route.query.page) : 1
      }
      return this.pagination.page
    },
    /**
     * @param {Object} options
     */
    fetchContext (options = {}) {
      if (this.builtin) {
        const page = (this.pagination.page - 1)

        const start = page * this.pagination.rowsPerPage
        const end = start + this.pagination.rowsPerPage
        this.data = this.value.slice(start, end)

        if (!this.data.length && this.value.length) {
          this.tableFetchApply({ page: this.pagination.page - 1 })
          return
        }

        this.pagination.rowsNumber = this.value.length
        this.pagination.pagesNumber = Math.ceil(this.pagination.rowsNumber / this.pagination.rowsPerPage)
        return
      }

      if (options === undefined || !is(options)) {
        const page = this.parsePageToFetch()
        options = {
          pagination: {
            ...this.pagination,
            page: page
          }
        }
      }

      if (options.pagination) {
        this.pagination = options.pagination
      }

      this.sorter = this.pagination.sortBy
      this.filters = [this.sorter]

      let { raw } = options
      if (!raw) {
        raw = {}
      }
      if (this.pagination.raw) {
        raw = { ...raw, ...this.pagination.raw }
      }

      const parameters = {
        pagination: this.pagination,
        sorter: this.sorter,
        [filterKey]: this[filterKey],
        [searchKey]: this[searchKey],
        raw: raw
      }

      return {
        parameters,
        filters: this.filters
      }
    },
    /**
     * @param {Object} options
     */
    fetchRecords (options = {}) {
      const context = this.fetchContext(options)
      if (!context) {
        return
      }

      this.loadingShow()

      try {
        this.triggerHook('request:records', context)
          .then(this.successFetchRecords)
          .catch(this.errorFetchRecords)
      } catch (e) {
        this.loadingHide()
        this.$error.notify(e)
      }
    },
    /**
     * @param {Object} response
     */
    successFetchRecords (response) {
      this.$payload = response

      this.loadingHide()

      this.data = response.rows
      this.pagination.rowsPerPage = response.rowsPerPage
      this.pagination.pagesNumber = response.pagesNumber
      this.pagination.page = response.page
      this.pagination.rowsNumber = response.rowsNumber
      /* "sortBy": null, "descending": false, "page": 1, "": 5  */

      // wildcard data
      if (response.payload) {
        this.payload = response.payload
      }

      if (!this.data.length && !this.embed) {
        const query = {}
        if (this.$route.query.page >= 2) {
          query.page = this.$route.query.page - 1
        }
        this.tableFetchApply(query, true)
        return
      }

      if (!this.triggerHook) {
        return
      }
      this.triggerHook('fetch:records')
    },
    /**
     * // @param {Object} error
     */
    errorFetchRecords (/* error */) {
      this.loadingHide()

      this.data = []
    },
    /**
     * @param {Object} options
     */
    fetchDownload (options = {}) {
      this.loadingShow()

      const context = this.fetchContext(options)
      const labels = this.columns.reduce((accumulator, column) => {
        if (column.field) {
          accumulator[column.field] = column.label
        }
        return accumulator
      }, {})
      context.parameters.raw = { labels }

      try {
        this.triggerHook('request:download', context)
          .then(this.successFetchDownload)
          .catch(this.errorFetchDownload)
      } catch (e) {
        this.loadingHide()
        this.$error.notify(e)
      }
    },
    /**
     * @param {Object} response
     */
    successFetchDownload (response) {
      this.loadingHide()

      const context = response.headers['context']
      let fileName = 'content.csv'
      if (typeof context === 'string') {
        fileName = context
      }

      const status = exportFile(fileName, response.data, response.type)
      if (status !== true) {
        this.$q.notify({
          message: '',
          color: 'negative',
          icon: 'warning'
        })
      }

      if (!this.triggerHook) {
        return
      }
      this.triggerHook('fetch:download')
    },
    /**
     * // @param {Object} error
     */
    errorFetchDownload (/* error */) {
      this.loadingHide()
    },
    /**
     */
    firstPage () {
      this.goToPage(1)
    },
    /**
     */
    previousPage () {
      this.goToPage(Number(this.pagination.page) - 1)
    },
    /**
     */
    nextPage () {
      this.goToPage(Number(this.pagination.page) + 1)
    },
    /**
     */
    lastPage () {
      this.goToPage(Number(this.pagination.pagesNumber))
    },
    /**
     * @param {number} page
     */
    goToPage (page) {
      const query = { page }
      if (this[filterKey]) {
        query[filterKey] = this[filterKey]
      }
      if (this[searchKey]) {
        query[searchKey] = this[searchKey]
      }
      if (this.$route.query.sort) {
        query.sort = this.$route.query.sort
      }
      this.tableFetchApply(query)
    },
    /**
     * @param {string} filter
     */
    tableFetchApplyFilter (filter = undefined) {
      if (filter !== undefined) {
        this[filterKey] = filter
      }
      let query = {}
      if (this[filterKey]) {
        query = { [filterKey]: this[filterKey] }
      }
      this.tableFetchApply(query)
    },
    /**
     * @param {string} search
     */
    applySearch (search = undefined) {
      if (search !== undefined) {
        this[searchKey] = search
      }
      let query = {}
      if (this[searchKey]) {
        query = { [searchKey]: this[searchKey] }
      }
      this.tableFetchApply(query)
    },
    /**
     * @param {Object} parameters
     */
    requestState (parameters) {
      if (!parameters.pagination.sortBy) {
        return
      }
      const direction = parameters.pagination.descending ? 'desc' : 'asc'
      const sort = `${parameters.pagination.sortBy}.${direction}`
      this.tableFetchApply({ sort }, true)
    },
    /**
     * @param query
     * @param options
     */
    tableFetchApply (query, options = undefined) {
      if (!this.embed && !this.builtin) {
        this.$browse({ query: query }, options)
        return
      }
      const { page } = query
      if (page) {
        this.pagination.page = page
      }
      this.fetchRecords()
    }
  }
}
