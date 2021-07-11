import { primaryKey } from 'src/settings/schema'

import actions from './actions'

/**
 * @type {Object}
 */
export default {
  table: {
    search: 'Search...',
    columns: 'Columns'
  },
  filter: {
    select: 'Select a correct filter'
  },
  fields: {
    [primaryKey]: 'Id',
    createdAt: 'Created at',
    updatedAt: 'Updated at',
    deletedAt: 'Deleted at',
    createdBy: 'Created by',
    updatedBy: 'Updated by',
    deletedBy: 'Deleted by'
  },
  components: {
    validation: {
      title: 'Validation Messages'
    },
    array: {
      empty: 'Use the button {button} to add items',
      remove: 'Remove this element from the list',
      confirm: 'Do you really want to remove this item from the list?',
      edit: 'Allows you to edit this element',
      reset: 'Cancel changes made',
      add: 'Add a new element to the list',
      apply: 'Apply changes made to the element',
      options: 'Options'
    },
    appSelectRemote: {
      noResults: 'The collection is empty',
      searching: 'Searching...',
      confirm: 'Confirm',
      cancel: 'Cancel',
      clear: 'Clear Selection',
      search: 'Search',
      notFound: '-',
      placeholder: 'Type to search...'
    },
    appSelectWithOthers: {
      others: {
        label: 'Others',
        placeholder: 'if other, specify (use comma separated or enter to each value)'
      }
    },
    password: {
      copied: 'A new password was created and has been copied to clipboard',
      generator: {
        tooltip: 'Create a new password with {length} characters'
      },
      visible: {
        tooltip: 'Make the password temporally visible'
      }
    },
    image: {
      button: 'Select an image'
    },
    file: {
      upload: 'Click here to upload the file',
      download: 'Click here to download the file',
      downloadName: 'file'
    },
    embed: {
      actions: {
        embedCreate: actions.create,
        embedUpdate: actions.update,
        embedReset: actions.reset,
        embedAdd: actions.add,
        embedTrash: actions.trash,
        embedEdit: actions.edit,
        embedDestroy: actions.destroy,
        embedRestore: actions.restore,
        embedView: actions.view,
        embedHome: actions.home,
        embedBack: actions.back,
        embedPrint: actions.print,
        embedRefresh: actions.refresh,
        embedSortClear: actions.sortClear,
        embedSearch: actions.search,
        embedSearchClear: actions.searchClear
      }
    },
    builtin: {
      form: {
        add: 'New',
        edit: 'Edit',
        view: 'View'
      },
      actions: {
        builtinAdd: {
          label: 'Add',
          tooltip: 'Create a new item in the item list'
        },
        builtinBack: {
          label: 'Back',
          tooltip: 'Back to the list of items'
        },
        builtinCancel: {
          label: 'Close',
          tooltip: 'Undo changes and return to the list of items'
        },
        builtinApply: {
          label: 'Apply',
          tooltip: 'Apply the change to the item list',
          validation: 'Check highlighted fields'
        },
        builtinView: {
          label: 'View',
          tooltip: 'View this item in the item list'
        },
        builtinEdit: {
          label: 'Edit',
          tooltip: 'Edit this item in the item list'
        },
        builtinDestroy: {
          label: 'Delete',
          tooltip: 'Remove this item from the item list',
          title: 'Remove',
          message: 'Do you want to remove this item from the item list?'
        }
      }
    }
  },
  dialog: {
    alert: {
      title: 'Warning'
    },
    confirm: {
      title: 'Confirm'
    },
    prompt: {
      title: 'Prompt'
    }
  },
  options: {
    gender: {
      male: 'Male',
      female: 'Female'
    },
    yesNo: {
      yes: 'Yes',
      no: 'No'
    }
  },
  modified: 'There are pending modifications to the screen. Do you want to continue anyway?',
  actions: actions
}
