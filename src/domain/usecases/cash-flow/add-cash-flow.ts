
export interface AddCashFlowParams {
  data: Date
  categoria: {
    name: string
  }
  tipo: string
  valor: number
  descricao: string

}

export interface AddCashFlow {
  add: (cashData: AddCashFlowParams) => Promise<void>
}
