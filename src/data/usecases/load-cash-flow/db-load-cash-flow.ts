import { LoadCashFlowRepository } from '@/data/protocols/db/cash-flow/load-cash-flow-repository'
import { CashFlowModel } from '@/domain/models/cash-flow'
import { LoadCashFlow } from '@/domain/usecases/cash-flow/load-cash-flow'

export class DbLoadCashFlow implements LoadCashFlow {
  constructor (
    private readonly loadCashFlowRepository: LoadCashFlowRepository
  ) {}

  async load (): Promise<CashFlowModel[]> {
    const response = await this.loadCashFlowRepository.loadAll()
    return response
  }
}
