import { HttpRequest, Validation, AddCashFlow, AddCashFlowParams } from './add-cash-flow-protocols'
import { AddCashFlowController } from './add-cash-flow-controller'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    categoria: {
      name: 'any_name'
    },
    tipo: 'any_tipo',
    valor: 'any_valor',
    descricao: 'any_descricao'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddCashFlow = (): AddCashFlow => {
  class AddCashFlowStub implements AddCashFlow {
    async add (data: AddCashFlowParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddCashFlowStub()
}

interface SutTypes {
  sut: AddCashFlowController
  validationStub: Validation
  addCashFlowStub: AddCashFlow

}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addCashFlowStub = makeAddCashFlow()
  const sut = new AddCashFlowController(validationStub, addCashFlowStub)
  return {
    sut,
    validationStub,
    addCashFlowStub
  }
}

describe('CashFlow Controller', () => {
  test('Should call Validation with correct values ', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddCashFlow with correct values ', async () => {
    const { sut, addCashFlowStub } = makeSut()
    const addSpy = jest.spyOn(addCashFlowStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddCashFlow throws', async () => {
    const { sut, addCashFlowStub } = makeSut()
    jest.spyOn(addCashFlowStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
