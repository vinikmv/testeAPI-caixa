import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import { Collection } from 'mongodb'
import request from 'supertest'

let cashFlowCollection: Collection

describe('CashFlow Routes', () => {
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

  describe('POST /cashflows', () => {
    test('Should return 403 on success ', async () => {
      await request(app)
        .post('/api/cashflows')
        .send({
          categoria: {
            name: 'Teste'
          },
          tipo: 'entrada',
          valor: 10,
          descricao: 'Deposito'
        })
        .expect(403)
    })
  })
})
