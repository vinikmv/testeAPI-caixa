import { InvalidParamError } from '@/presentation/errors'
import { TypeValidation } from '@/validation/validators/type-validation'
import { TypeValidator } from '@/validation/protocols/type-validator'

export const makeTypeValidator = (): TypeValidator => {
  class TypeValidatorStub implements TypeValidator {
    isValidType (text: string): boolean {
      return true
    }
  }
  return new TypeValidatorStub()
}

interface SutTypes {
  sut: TypeValidation
  typeValidatorStub: TypeValidator
}

const makeSut = (): SutTypes => {
  const typeValidatorStub = makeTypeValidator()
  const sut = new TypeValidation('tipo', typeValidatorStub)
  return {
    sut,
    typeValidatorStub
  }
}

describe('Type Validation', () => {
  test('should return an error if TypeValidator returns false', () => {
    const { sut, typeValidatorStub } = makeSut()
    jest.spyOn(typeValidatorStub, 'isValidType').mockReturnValueOnce(false)
    const error = sut.validate({ tipo: 'invalid_value' })
    expect(error).toEqual(new InvalidParamError('tipo'))
  })

  test('should call CurrencyValidator with correct value', () => {
    const { sut, typeValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(typeValidatorStub, 'isValidType')
    sut.validate({ tipo: 'Entrada' })
    expect(isValidSpy).toHaveBeenCalledWith('Entrada')
  })

  test('should throw if TypeValidator throws', () => {
    const { sut, typeValidatorStub } = makeSut()
    jest.spyOn(typeValidatorStub, 'isValidType').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
