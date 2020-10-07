import { Validation } from '@/presentation/protocols'
import { AddCashFlowController } from './add-cash-flow-controller'
import { HttpRequest } from './add-cash-flow-protocols'

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

interface SutTypes {
  sut: AddCashFlowController
  validationStub: Validation

}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddCashFlowController(validationStub)
  return {
    sut,
    validationStub
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
})
