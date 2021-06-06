/**
 * @param foreignKey
 * @return {function(...[*]=)}
 */
export function fieldIsEmbedWatch (foreignKey) {
  return function (value) {
    this.$getField(foreignKey).$setValue(value)
  }
}
