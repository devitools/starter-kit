<template>
  <SchemaFormAsync v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/Async'
import Schema from 'source/domains/General/Category/Schema/CategorySchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'CategoryForm',
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
