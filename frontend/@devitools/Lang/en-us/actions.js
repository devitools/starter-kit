/**
 * @type {Object}
 */
export default {
  create: {
    label: 'Save',
    success: 'Record successfully created',
    fail: 'Ops, can not execute the operation',
    validation: 'Check highlighted fields',
    warn: 'Check highlighted fields',
    tooltip: 'Create a new record'
  },
  update: {
    label: 'Save',
    success: 'Record successfully updated',
    fail: 'Ops, can not execute the operation',
    validation: 'Check highlighted fields',
    warn: 'Check highlighted fields',
    tooltip: 'Update a record'
  },
  reset: {
    label: 'Clear',
    tooltip: ''
  },
  add: {
    label: 'New',
    tooltip: 'Opens the new record creation screen'
  },
  trash: {
    label: 'Trash',
    tooltip: 'Open the trash can to retrieve a record'
  },
  edit: {
    label: 'Edit',
    tooManySelected: 'This operation cannot be done for multiple records',
    noItems: 'This operation needs a selected item or context',
    tooltip: 'Open a record change screen'
  },
  destroy: {
    label: 'Delete',
    success: 'Record(s) removed successfully',
    confirm: 'Do you want to delete this record(s)?',
    noItems: 'This operation needs a selected item or context',
    fail: 'Whoops, could not perform the operation',
    warn: 'We can\'t remove the record(s), check dependencies',
    tooltip: 'Remove a record'
  },
  restore: {
    label: 'Restore',
    success: 'Record(s) restored successfully',
    confirm: 'Do you want to restore these record(s)?',
    noItems: 'This operation needs a selected item or context',
    fail: 'Whoops, could not perform the operation',
    warn: 'We can\'t remove the record(s), check dependencies',
    tooltip: 'Restore a record that was in the trash'
  },
  erase: {
    label: 'Erase',
    success: 'Record(s) erased successfully',
    confirm: 'Do you want to erase these record(s)?',
    noItems: 'This operation needs a selected item or context',
    fail: 'Whoops, could not perform the operation',
    warn: 'We can\'t erase the record(s), check dependencies',
    tooltip: 'Permanently erase a record (delete from trash)'
  },
  view: {
    label: 'View',
    tooManySelected: 'This operation cannot be done for multiple records',
    noItems: 'This operation needs a selected item or context',
    tooltip: 'Opens a record preview screen'
  },
  home: {
    label: 'Back to List',
    tooltip: 'Back to main list'
  },
  back: {
    label: 'Back',
    tooltip: 'Return to previous screen'
  },
  print: {
    label: 'Print',
    tooltip: 'Print the printout of this page\'s content'
  },
  refresh: {
    label: 'Update',
    tooltip: 'Update loaded records on screen'
  },
  export: {
    label: 'Download',
    tooltip: 'Download the data of the loaded records on screen'
  },
  sortClear: {
    noSort: 'Sorting is not active to be restarted',
    tooltip: 'Remove sort applied to canvas'
  },
  search: {
    label: 'Search',
    tooltip: 'Search for values ​​entered in form'
  },
  searchClear: {
    label: 'Clear',
    tooltip: 'Clear all applied filters'
  },
  validationClear: {
    label: 'Clear',
    tooltip: 'Clear all validation messages'
  }
}
