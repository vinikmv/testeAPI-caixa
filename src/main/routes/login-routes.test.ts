import app from '@/main/config/app'
import request from 'supertest'

describe('Login Routes', () => {
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
})
