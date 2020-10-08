export const cashFlowsPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Fluxo de caixa'],
    summary: 'API para criar uma movimentação',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addCashFlowParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Fluxo de caixa'],
    summary: 'API para listar sua carteira com o saldo e todas as movimentações realizadas',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/listCashFlowParams'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
