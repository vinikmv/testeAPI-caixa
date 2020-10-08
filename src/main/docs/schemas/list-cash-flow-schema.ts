export const listCashFlowSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'number'
    },
    saldoTotal: {
      type: 'number'
    },
    movimentacoes: {
      type: 'array',
      items: {
        $ref: '#/schemas/movement'
      }
    }
  }
}
