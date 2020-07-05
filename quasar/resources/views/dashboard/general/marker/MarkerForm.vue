<template>
  <SchemaForm v-bind="bind" />
</template>

<script type="text/javascript">
import View from '@devitools/Agnostic/Adapters/View'
import Schema from 'source/domains/General/Marker/Schema/MarkerSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'MarkerForm',
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
