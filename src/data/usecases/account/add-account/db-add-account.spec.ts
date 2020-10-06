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

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeFakeAccountData = (): AddAccountParams => ({
  email: 'valid_email',
  password: 'valid_password'
})

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(makeFakeAccount())
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
    await sut.add(makeFakeAccountData())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws ', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws ', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual({
      id: 'valid_id',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })
})
