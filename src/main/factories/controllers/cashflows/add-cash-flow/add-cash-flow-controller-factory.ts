import { makeAddCashFlowValidation } from '@/main/factories/controllers/cashflows/add-cash-flow/add-cash-flow-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddCashFlow } from '@/main/factories/usecases/add-cash-flow/db-add-cash-flow-factory'
import { AddCashFlowController } from '@/presentation/controllers/cash-flow/add-cash-flow/add-cash-flow-controller'
import { Controller } from '@/presentation/protocols'

export const makeAddCashFlowController = (): Controller => {
  const controller = new AddCashFlowController(makeAddCashFlowValidation(), makeDbAddCashFlow())
  return makeLogControllerDecorator(controller)
}
