export interface CashFlowResultModel {
  saldoTotal: number
  movimentacoes: CashFlowModel[]
}

export interface CashFlowModel {
  data: Date
  id: string
  categoria: {
    id: string
    name: string
  }
  tipo: string
  valor: number
  descricao: string
}
