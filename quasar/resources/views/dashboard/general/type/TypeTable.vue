<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/General/Type/Schema/TypeSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'TypeTable',
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
