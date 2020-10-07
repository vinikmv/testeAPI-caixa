import { DbAddCashFlow } from '@/data/usecases/add-cash-flow/db-add-cash-flow'
import { AddCashFlow } from '@/domain/usecases/cash-flow/add-cash-flow'
import { CashFlowMongoRepository } from '@/infra/db/mongodb/cash-flow/cash-flow-mongo-repository'

export const makeDbAddCashFlow = (): AddCashFlow => {
  const cashFlowMongoRepository = new CashFlowMongoRepository()
  return new DbAddCashFlow(cashFlowMongoRepository)
}
