<template>
  <div>
    <div class="SchemaForm">
      <div class="app-form-wrapper">
        <div class="app-form-body">
          <div class="form form-grid">
            <div class="field width-100 height-1">
              <div class="q-pb-sm">
                <QSkeleton
                  type="rect"
                  width="50px"
                />
              </div>
              <QSkeleton
                type="QInput"
                width="100%"
              />
            </div>
            <div class="field width-50 height-1">
              <div class="q-pb-sm q-pt-sm">
                <QSkeleton
                  type="rect"
                  width="100px"
                />
              </div>
              <QSkeleton
                type="QInput"
                width="100%"
              />
            </div>
            <div class="field width-50 height-1">
              <div class="q-pb-sm q-pt-sm">
                <QSkeleton
                  type="rect"
                  width="50px"
                />
              </div>
              <QSkeleton
                type="QInput"
                width="100%"
              />
            </div>
            <div class="field width-50 height-1">
              <div class="q-pb-sm q-pt-sm">
                <QSkeleton
                  type="rect"
                  width="70px"
                />
              </div>
              <QSkeleton
                type="QToggle"
                width="100%"
              />
            </div>
          </div>
        </div>
        <div
          class="app-form-buttons flex q-gutter-md"
          style="height: 56px"
        >
          <QSkeleton
            type="rect"
            width="100px"
            height="36px"
          />
          <QSpace />
          <QSkeleton
            type="rect"
            width="100px"
            height="36px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QSkeleton, QSpace } from 'quasar'

export default {
  /**
   */
  name: 'SkeletonSchemaForm',
  /**
   */
  components: { QSkeleton, QSpace }
}
</script>
