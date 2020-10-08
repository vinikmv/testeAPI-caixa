export const movementSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    categoria: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' }
      }
    },
    tipo: {
      type: 'string'
    },
    valor: {
      type: 'string'
    },
    descricao: {
      type: 'string'
    },
    data: {
      type: 'string'
    }
  }
}
