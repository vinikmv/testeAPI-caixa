
export interface AddCashFlowParams {
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
