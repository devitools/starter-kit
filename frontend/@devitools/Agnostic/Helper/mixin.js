/**
 * @param base
 * @param mixins
 */
export default function (base, mixins) {
  const mergeMixin = (baseConstructor) => {
    const mergeProperties = (name) => {
      const attributes = Object.getOwnPropertyDescriptor(baseConstructor.prototype, name)
      Object.defineProperty(base.prototype, name, attributes)
    }

    Object.getOwnPropertyNames(baseConstructor.prototype).forEach(mergeProperties)
  }
  mixins.forEach(mergeMixin)
}
