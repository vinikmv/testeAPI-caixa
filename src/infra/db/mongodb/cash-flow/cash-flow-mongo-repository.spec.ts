import { CashFlowMongoRepository } from './cash-flow-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { AddCashFlowParams } from '@/domain/usecases/cash-flow/add-cash-flow'

let cashFlowCollection: Collection
const valor: number = 10

const makeFakeCashData = (): AddCashFlowParams => ({
  categoria: {
    name: 'any_name'
  },
  tipo: 'any_tipo',
  valor,
  descricao: 'any_descricao'
})

const makeSut = (): CashFlowMongoRepository => new CashFlowMongoRepository()

describe('CashFlowMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    cashFlowCollection = await MongoHelper.getCollection('cashflows')
    await cashFlowCollection.deleteMany({})
  })

  test('Should add a cash flow on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeCashData())
    const cashFlow = await cashFlowCollection.findOne({ tipo: 'any_tipo' })
    expect(cashFlow).toBeTruthy()
  })
})
