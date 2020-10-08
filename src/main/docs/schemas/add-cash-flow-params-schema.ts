export const addCashFlowParamsSchema = {
  type: 'object',
  properties: {
    categoria: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      }
    },
    tipo: {
      type: 'string'
    },
    valor: {
      type: 'number'
    },
    descricao: {
      type: 'string'
    }
  },
  required: ['categoria', 'tipo', 'valor', 'descricao']
}
