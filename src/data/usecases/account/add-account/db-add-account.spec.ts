import { Hasher } from '@/data/protocols/cryptography/hasher'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'

class HasherStub implements Hasher {
  async hash (plaintext: string): Promise<string> {
    return await Promise.resolve('hashed_value')
  }
}

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const hasherStub = new HasherStub()
  const sut = new DbAddAccount(hasherStub)
  return {
    sut,
    hasherStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password ', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    const accoundData = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accoundData)
    expect(hasherSpy).toHaveBeenCalledWith('valid_password')
  })
})
