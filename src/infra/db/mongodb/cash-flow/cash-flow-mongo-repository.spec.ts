import { CashFlowMongoRepository } from './cash-flow-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { AddCashFlowParams } from '@/domain/usecases/cash-flow/add-cash-flow'
import MockDate from 'mockdate'

let cashFlowCollection: Collection
const valor: number = 10

const makeFakeCashData = (): AddCashFlowParams => ({
  data: new Date(),
  categoria: {
    name: 'any_name'
  },
  tipo: 'any_tipo',
  valor,
  descricao: 'any_descricao',
  accountId: 'any_id'
})

const makeSut = (): CashFlowMongoRepository => new CashFlowMongoRepository()

describe('CashFlowMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    cashFlowCollection = await MongoHelper.getCollection('cashflows')
    await cashFlowCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a cash flow on success', async () => {
      const sut = makeSut()
      await sut.add(makeFakeCashData())
      const cashFlow = await cashFlowCollection.findOne({ tipo: 'any_tipo' })
      expect(cashFlow).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all cash flow on success', async () => {
      await cashFlowCollection.insertMany([{
        accountId: 'any_accountId',
        data: new Date(),
        categoria: {
          name: 'any_name'
        },
        tipo: 'any_tipo',
        valor,
        descricao: 'any_descricao'
      },
      {
        accountId: 'any_accountId',
        data: new Date(),
        categoria: {
          name: 'other_name'
        },
        tipo: 'other_tipo',
        valor,
        descricao: 'other_descricao'
      }])
      const sut = makeSut()
      const cashFlow = await sut.loadAll('any_accountId')
      expect(cashFlow.length).toBe(1)
    })

    test('Should load empty cash flow list', async () => {
      const sut = makeSut()
      const cashFlow = await sut.loadAll('any_accountId')
      expect(cashFlow.length).toBe(0)
    })
  })
})
