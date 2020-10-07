import { AddCashFlow, AddCashFlowParams, AddCashFlowRepository } from './db-add-cash-flow-protocols'

export class DbAddCashFlow implements AddCashFlow {
  constructor (private readonly addCashFlowRepository: AddCashFlowRepository) {}

  async add (cashData: AddCashFlowParams): Promise<void> {
    await this.addCashFlowRepository.add(cashData)
  }
}
