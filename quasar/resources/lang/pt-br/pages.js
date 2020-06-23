/**
 * messages to routes
 * crumb is used in breadcrumb
 * @see AppBreadcrumb
 * title is used to update the document.title for update router middleware
 * @sse updateTitle
 */
export default {
  '/': {
    title: 'Login | Devitools'
  },
  '/dashboard': {
    crumb: 'Home'
  },
  '/dashboard/home': {
    title: 'Welcome to Devitools'
  },
  dashboard: {
    index: {
      version: 'Version',
      transactionCard: {
        title: 'Transactions',
        subtitle: 'Manage your transactions',
        actionNew: 'Create a new Transaction',
        actionAll: 'My Transactions'
      }
    }
  }
}
