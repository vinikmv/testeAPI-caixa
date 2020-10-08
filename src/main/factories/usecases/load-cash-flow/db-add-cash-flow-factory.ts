import { DbLoadCashFlow } from '@/data/usecases/load-cash-flow/db-load-cash-flow'
import { LoadCashFlow } from '@/domain/usecases/cash-flow/load-cash-flow'
import { CashFlowMongoRepository } from '@/infra/db/mongodb/cash-flow/cash-flow-mongo-repository'

export const makeDbLoadCashFlow = (): LoadCashFlow => {
  const cashFlowMongoRepository = new CashFlowMongoRepository()
  return new DbLoadCashFlow(cashFlowMongoRepository)
}
