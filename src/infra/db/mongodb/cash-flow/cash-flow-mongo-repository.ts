import { AddCashFlowRepository } from '@/data/protocols/db/cash-flow/add-cash-flow-repository'
import { AddCashFlowParams } from '@/domain/usecases/cash-flow/add-cash-flow'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class CashFlowMongoRepository implements AddCashFlowRepository {
  async add (cashData: AddCashFlowParams): Promise<void> {
    const cashFlowCollection = await MongoHelper.getCollection('cashflows')
    await cashFlowCollection.insertOne(cashData)
  }
}
