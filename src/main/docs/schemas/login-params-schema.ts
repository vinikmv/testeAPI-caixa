export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'password'
    }
  },
  required: ['email', 'password']
}
