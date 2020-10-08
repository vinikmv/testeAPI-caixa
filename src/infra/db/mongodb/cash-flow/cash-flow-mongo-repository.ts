import { AddCashFlowRepository } from '@/data/protocols/db/cash-flow/add-cash-flow-repository'
import { LoadCashFlowRepository } from '@/data/protocols/db/cash-flow/load-cash-flow-repository'
import { CashFlowModel } from '@/domain/models/cash-flow'
import { AddCashFlowParams } from '@/domain/usecases/cash-flow/add-cash-flow'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class CashFlowMongoRepository implements AddCashFlowRepository, LoadCashFlowRepository {
  async add (cashData: AddCashFlowParams): Promise<void> {
    const cashFlowCollection = await MongoHelper.getCollection('cashflows')
    const { categoria, ...cashDataSemCategoria } = cashData
    const { name } = categoria
    await cashFlowCollection.insertOne({ ...cashDataSemCategoria, categoria: { id: new ObjectId(), name } })
  }

  async loadAll (accountId: string): Promise<CashFlowModel[]> {
    const cashFlowCollection = await MongoHelper.getCollection('cashflows')
    const query = await cashFlowCollection.aggregate([{
      $match: {
        accountId: accountId
      }
    }, {
      $group: {
        _id: 0,
        saldoTotal: {
          $sum: '$valor'
        },
        movimentacoes: {
          $push: '$$ROOT'
        }
      }
    }, {
      $unset: [
        'movimentacoes.accountId'
      ]
    }]).toArray()
    return query
    // const cashFlows = await cashFlowCollection.find({ accountId }).toArray()
  }
}
