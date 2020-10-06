import { Hasher } from './db-add-account-protocols'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (plaintext: string): Promise<string> {
      return await Promise.resolve('hashed_value')
    }
  }
  return new HasherStub()
}

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
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

  test('Should throw if Hasher throws ', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accoundData = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const promise = sut.add(accoundData)
    await expect(promise).rejects.toThrow()
  })
})
