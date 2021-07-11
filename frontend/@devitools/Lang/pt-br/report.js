/**
 */
export default {
  fail: 'Ops, não foi possível realizar a operação',
  validation: 'Verifique os campos destacados',
  actions: {
    submit: {
      label: 'Executar',
      tooltip: 'Executa o relatório passando os filtros informados'
    },
    printing: {
      label: 'Imprimir',
      tooltip: 'Executa o relatório e solicita uma impressão assim que o mesmo é impresso na tela'
    },
    return: {
      label: 'Voltar',
      tooltip: 'Volta para a tela de filtros'
    },
    printer: {
      label: 'Imprimir',
      tooltip: 'Imprime o relatório que acabou de ser executado e está visível'
    },
    csv: {
      label: 'Download',
      tooltip: 'Solicita o download dos dados aplicando os filtros informados'
    }
  }
}
