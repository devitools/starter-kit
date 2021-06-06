<template>
  <div class="AppArrayLazy AppArray">
    <div class="AppArray__wrapper">
      <AppArrayHead
        :domain="domain"
        :fields="fields"
        :readonly="readonly"
        :scope="scope"
      />

      <template v-if="length > 0">
        <div class="AppArray__body">
          <slot name="body" />
        </div>
      </template>

      <template v-else>
        <div
          class="AppArray__empty"
          v-html="empty"
        />
      </template>
    </div>

    <div>
      <slot name="add" />
    </div>
  </div>
</template>

<script type="text/javascript">
import { AppArrayBasic, AppArrayProps, AppArrayEmpty } from './Mixins'
import AppArrayHead from './Partials/AppArrayHead'

export default {
  /**
   */
  name: 'AppArray',
  /**
   */
  mixins: [AppArrayBasic, AppArrayProps, AppArrayEmpty],
  /**
   */
  components: { AppArrayHead },
  /**
   */
  props: {
    length: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
@import '~src/css/quasar.variables.styl'
@import './Partials/app-array-include.styl'

.AppArray {

  .AppArray__empty {
    @extend .AppArray__element--color
    border-width: 1px 0 0 0;
    padding: 10px;
    text-align: center;
    color: #797979;
  }

  .AppArray__wrapper {
    @extend .AppArray__element--color
    border-width: 1px;
    border-radius: 4px;

    .AppArray__body {
      .app-form__label {
        display: none;
      }
    }
  }

  .q-field__native.row.items-center {
    flex-wrap: nowrap;
  }

  .has-error {
    > div > label {
      color: $errorForeground;
    }

    & > .q-field > .q-field__inner > .q-field__control {
      color: darken($errorBackground, 25%);

      &:before {
        border-color: $errorBackground;
      }

      &:after {
        background: $errorBackground;
      }
    }
  }
}
</style>
