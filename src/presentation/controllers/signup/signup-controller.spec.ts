import { SignUpController } from './signup-controller'
import { InvalidParamError, ServerError, MissingParamError } from '@/presentation/errors'
import { EmailValidator } from '@/presentation/protocols'
import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import faker from 'faker'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountParams): AccountModel {
      const mockAccount = {
        id: faker.random.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
      return mockAccount
    }
  }
  return new AddAccountStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no email if provided', () => {
    const { sut } = makeSut()
    const password = faker.internet.password()
    const httpRequest = {
      body: {
        password,
        passwordConfirmation: password
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password if provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: faker.internet.email()
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation if provided', () => {
    const { sut } = makeSut()
    const password = faker.internet.password()
    const httpRequest = {
      body: {
        email: faker.internet.email(),
        password
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    )
  })

  test('Should return 400 if passwordConfirmation fails', () => {
    const { sut } = makeSut()
    const password = faker.internet.password()
    const httpRequest = {
      body: {
        email: faker.internet.email(),
        password,
        passwordConfirmation: faker.random.word()
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation')
    )
  })

  test('Should return 400 if an invalid email if provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const password = faker.internet.password()
    const httpRequest = {
      body: {
        email: faker.random.word(),
        password,
        passwordConfirmation: password
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const email = faker.internet.email()
    const password = faker.internet.password()
    const httpRequest = {
      body: {
        email,
        password,
        passwordConfirmation: password
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const email = faker.internet.email()
    const password = faker.internet.password()
    const httpRequest = {
      body: {
        email,
        password,
        passwordConfirmation: password
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const email = faker.internet.email()
    const password = faker.internet.password()
    const httpRequest = {
      body: {
        email,
        password,
        passwordConfirmation: password
      }
    }
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      email,
      password
    })
  })

  test('Should return 500 if AddAccount throws', () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const email = faker.internet.email()
    const password = faker.internet.password()
    const httpRequest = {
      body: {
        email,
        password,
        passwordConfirmation: password
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
