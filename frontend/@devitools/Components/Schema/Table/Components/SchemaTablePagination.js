import { QBtn } from 'quasar'

export default {
  /**
   */
  name: 'SchemaTablePagination',
  /**
   */
  props: {
    pagination: {
      type: Object,
      default: () => ({})
    },
    isFirstPage: {
      type: Boolean,
      default: false
    },
    isLastPage: {
      type: Boolean,
      default: false
    }
  },
  /**
   * @param {CreateElement} h
   * @return {VNode}
   */
  render (h) {
    const texts = [
      this.pagination.rowsPerPage * (this.pagination.page - 1) + 1, '-'
    ]
    let fragment = this.pagination.rowsPerPage * (this.pagination.page)
    if (this.isLastPage) {
      fragment = this.pagination.rowsNumber
    }
    texts.push(fragment)
    texts.push('/')
    texts.push(this.pagination.rowsNumber)

    const button = {
      round: true,
      dense: true,
      flat: true,
      textColor: 'grey-8'
    }

    const first = {
      attrs: {
        ...button,
        disable: this.isFirstPage,
        icon: 'first_page'
      },
      on: { click: () => this.$emit('trigger:first-page') }
    }

    const previous = {
      attrs: {
        ...button,
        disable: this.isFirstPage,
        icon: 'chevron_left'
      },
      on: { click: () => this.$emit('trigger:previous-page') }
    }

    const next = {
      attrs: {
        ...button,
        disable: this.isLastPage,
        icon: 'chevron_right'
      },
      on: { click: () => this.$emit('trigger:next-page') }
    }

    const last = {
      attrs: {
        ...button,
        disable: this.isLastPage,
        icon: 'last_page'
      },
      on: { click: () => this.$emit('trigger:last-page') }
    }

    const data = {
      class: 'SchemaTablePagination'
    }
    const children = [
      h('span', { class: 'q-table__bottom-item' }, texts.join(' ')),
      h(QBtn, first),
      h(QBtn, previous),
      h('span', { class: 'text-center' }, `${this.pagination.page} / ${this.pagination.pagesNumber}`),
      h(QBtn, next),
      h(QBtn, last)
    ]
    return h('div', data, children)
  }
}
