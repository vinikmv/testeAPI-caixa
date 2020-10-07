import { adaptRoute } from '@/main/adapter/express-route-adapter'
import { makeCashFlowController } from '@/main/factories/controllers/cashflows/add-cash-flow-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/cashflows', adaptRoute(makeCashFlowController()))
}
