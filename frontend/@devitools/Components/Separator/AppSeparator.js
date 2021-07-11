import './style.styl'

/**
 * @component {AppSeparator}
 */
export default {
  /**
   */
  functional: true,
  /**
   */
  name: 'AppSeparator',
  /**
   * @param {CreateElement} h
   * @param {RenderContext} context
   * @returns {VNode}
   */
  render (h, context) {
    const { props } = context
    const className = ['app-separator']
    let innerHTML
    if (props.label) {
      innerHTML = `<small>${props.label}</small>`
      className.push('app-separator--with-label')
    }
    return h('hr', { class: className, domProps: { innerHTML } })
  }
}
