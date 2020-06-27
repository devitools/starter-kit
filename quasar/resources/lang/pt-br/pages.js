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
    crumb: 'Início'
  },
  '/dashboard/home': {
    title: 'Bem vindo ao Devitools'
  },
  dashboard: {
    index: {
      version: 'Versão',
      transactionCard: {
        title: 'Transações',
        subtitle: 'Gerenciar transações',
        actionNew: 'Criar uma nova transação',
        actionAll: 'Minhas transações'
      }
    }
  }
}
