export interface CashFlowResult {
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
  valor: string
  descricao: string
}
