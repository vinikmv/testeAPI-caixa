import { adaptMiddleware } from '@/main/adapter/express-middleware-adapter'
import { adaptRoute } from '@/main/adapter/express-route-adapter'
import { makeAddCashFlowController } from '@/main/factories/controllers/cashflows/add-cash-flow/add-cash-flow-controller-factory'
import { makeLoadCashFlowController } from '@/main/factories/controllers/cashflows/load-cash-flow/load-cash-flow-controller-factory'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { Router } from 'express'

export default (router: Router): void => {
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/cashflows', auth, adaptRoute(makeAddCashFlowController()))
  router.get('/cashflows', auth, adaptRoute(makeLoadCashFlowController()))
}
