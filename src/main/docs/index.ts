import paths from './paths'
import components from './components'
import {
  accountSchema,
  addCashFlowParamsSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema,
  movementSchema,
  listCashFlowSchema,
  categoryNameSchema
} from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'vCaixa-dev',
    description: 'API para fluxo de caixa na sua empresa',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Fluxo de caixa'
  }],
  paths,
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    addCashFlowParams: addCashFlowParamsSchema,
    error: errorSchema,
    movement: movementSchema,
    listCashFlowParams: listCashFlowSchema,
    categoryName: categoryNameSchema
  },
  components
}
