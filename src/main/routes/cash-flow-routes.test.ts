import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let cashFlowsCollection: Collection
let accountCollection: Collection

describe('CashFlow Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    cashFlowsCollection = await MongoHelper.getCollection('cashflows')
    await cashFlowsCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /cashflows', () => {
    test('Should return 403 on add cashflow without accessToken', async () => {
      await request(app)
        .post('/api/cashflows')
        .send({
          categoria: {
            name: 'any_name'
          },
          tipo: 'any_tipo',
          valor: '100',
          descricao: 'any_descricao'
        })
        .expect(403)
    })

    test('Should return 204 on add cashflow with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        email: 'teste.12345gmail.com',
        password: '123'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne(
        {
          _id: id
        },
        {
          $set: {
            accessToken
          }
        }
      )
      await request(app)
        .post('/api/cashflows')
        .set('x-access-token', accessToken)
        .send({
          categoria: {
            name: 'any_name'
          },
          tipo: 'Entrada',
          valor: '100',
          descricao: 'any_descricao'
        })
        .expect(204)
    })
  })

  describe('get /cashflows', () => {
    test('Should return 403 on load cashflows without accessToken', async () => {
      await request(app)
        .get('/api/cashflows')
        .expect(403)
    })

    test('Should return 200 on add cashflow with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        email: 'teste.123gmail.com',
        password: '123'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne(
        {
          _id: id
        },
        {
          $set: {
            accessToken
          }
        }
      )
      await cashFlowsCollection.insertMany([{
        accountId: id,
        data: new Date(),
        categoria: {
          name: 'any_name'
        },
        tipo: 'any_tipo',
        valor: 2,
        descricao: 'any_descricao'
      }
      ])
      await request(app)
        .get('/api/cashflows')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
