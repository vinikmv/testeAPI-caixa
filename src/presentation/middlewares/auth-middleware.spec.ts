import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'

export const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<AccountModel> {
      return await Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountBytokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountBytokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountBytokenStub)
  return {
    sut,
    loadAccountBytokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no access token exist in headers ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountBytokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountBytokenStub, 'load')
    await sut.handle({
      headers: {
        access_token: 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
