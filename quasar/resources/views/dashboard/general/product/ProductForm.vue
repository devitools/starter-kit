<template>
  <SchemaForm v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/Async'
import Schema from 'source/domains/General/Product/Schema/ProductSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'ProductForm',
  /**
   */
  schema: Schema
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
</style>
