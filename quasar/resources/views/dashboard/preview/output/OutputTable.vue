<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/Preview/Output/Schema/OutputSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'OutputTable',
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
