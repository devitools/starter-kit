<template>
  <div>
    <div class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--dense q-table--no-wrap SchemaTable">
      <div
        class="q-table__top relative-position row items-center"
        style="height: 52px"
      >
        <div class="app-form-buttons flex q-gutter-md">
          <QSkeleton
            type="rect"
            width="50px"
          />
          <QSkeleton
            type="rect"
            width="50px"
          />
        </div>
        <div class="q-space" />
        <QSkeleton
          type="rect"
          width="50%"
        />
      </div>
      <div class="q-table__middle scroll">
        <table class="q-table">
          <thead>
            <tr>
              <th class="text-left">
                <QSkeleton
                  type="rect"
                  width="100px"
                />
              </th>
              <th class="text-left">
                <QSkeleton
                  type="rect"
                  width="50px"
                />
              </th>
              <th class="text-left">
                <QSkeleton
                  type="rect"
                  width="50px"
                />
              </th>
              <th class="text-left">
                <QSkeleton
                  type="rect"
                  width="100%"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="i in 6"
              :key="i"
            >
              <td
                class="text-left"
                style="width: auto;"
              >
                <QSkeleton
                  type="rect"
                  width="100px"
                />
              </td>
              <td
                class="text-left"
                style="width: auto"
              >
                <QSkeleton
                  type="rect"
                  width="50px"
                />
              </td>
              <td
                class="text-left"
                style="width: auto"
              >
                <QSkeleton
                  type="rect"
                  width="50px"
                />
              </td>
              <td
                class="text-left"
                style="width: auto"
              >
                <QSkeleton
                  type="rect"
                  width="100%"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="q-table__bottom row items-center q-table__bottom--nodata"
        style="width: 42px"
      >
        <QSkeleton
          type="rect"
          width="150px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { QSkeleton } from 'quasar'

export default {
  /**
   */
  name: 'SkeletonSchemaTable',
  /**
   */
  components: { QSkeleton }
}
</script>
