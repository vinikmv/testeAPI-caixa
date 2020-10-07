import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return an account on success ', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          email: 'vinicius_teste@gmail.com',
          password: '12345',
          passwordConfirmation: '12345'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login ', async () => {
      const password = await hash('12345', 12)
      await accountCollection.insertOne({
        email: 'vinicius_teste@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'vinicius_teste@gmail.com',
          password: '12345'
        })
        .expect(200)
    })

    test('Should return 401 on login ', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'vinicius_teste@gmail.com',
          password: '12345'
        })
        .expect(401)
    })
  })
})
