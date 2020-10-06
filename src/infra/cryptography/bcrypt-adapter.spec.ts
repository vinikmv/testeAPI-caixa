import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  }
}))
const salt = 12
const makeSut = (): BcryptAdapter => new BcryptAdapter(salt)

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values ', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })
})
