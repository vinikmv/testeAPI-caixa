
export interface AddCashFlowParams {
  categoria: {
    name: string
  }
  tipo: string
  valor: number
  descricao: string
}

export interface AddCashFlow {
  add: (account: AddCashFlowParams) => Promise<void>
}
