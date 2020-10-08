import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadCashFlow } from '@/main/factories/usecases/load-cash-flow/db-add-cash-flow-factory'
import { LoadCashFlowController } from '@/presentation/controllers/cash-flow/load-cash-flow/load-cash-flow-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadCashFlowController = (): Controller => {
  const controller = new LoadCashFlowController(makeDbLoadCashFlow())
  return makeLogControllerDecorator(controller)
}
