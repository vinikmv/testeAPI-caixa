export const signUpParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'password'
    },
    passwordConfirmation: {
      type: 'password'
    }
  },
  required: ['email', 'password', 'passwordConfirmation']
}
