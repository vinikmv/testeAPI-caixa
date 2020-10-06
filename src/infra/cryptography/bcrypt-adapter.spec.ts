import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values ', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
