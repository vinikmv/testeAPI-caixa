import { adaptMiddleware } from '@/main/adapter/express-middleware-adapter'
import { adaptRoute } from '@/main/adapter/express-route-adapter'
import { makeCashFlowController } from '@/main/factories/controllers/cashflows/add-cash-flow-controller-factory'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { Router } from 'express'

export default (router: Router): void => {
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/cashflows', auth, adaptRoute(makeCashFlowController()))
}
