import { Hasher, AddAccountParams, AccountModel, AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (plaintext: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        email: 'valid_email',
        password: 'hashed_password'
      }
      return await Promise.resolve(fakeAccount)
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password ', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const accoundData = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accoundData)
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
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

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accoundData = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accoundData)
    expect(addSpy).toHaveBeenCalledWith({
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })
})
