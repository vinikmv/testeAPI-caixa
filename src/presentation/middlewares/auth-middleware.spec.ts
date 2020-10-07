import { AccountModel, LoadAccountByToken, HttpRequest } from './auth-middleware-protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'

export const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const makeFakeRequest = (): HttpRequest => ({
  headers: {
    access_token: 'any_token'
  }
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
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return 403 if LoadAccountByToken returns null ', async () => {
    const { sut, loadAccountBytokenStub } = makeSut()
    jest.spyOn(loadAccountBytokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if LoadAccountByToken throws ', async () => {
    const { sut, loadAccountBytokenStub } = makeSut()
    jest.spyOn(loadAccountBytokenStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    await expect(httpResponse).toEqual(serverError(new Error()))
  })
})
