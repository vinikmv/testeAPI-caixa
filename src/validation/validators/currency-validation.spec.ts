import { InvalidParamError } from '@/presentation/errors'
import { CurrencyValidation } from '@/validation/validators/currency-validation'
import { CurrencyValidator } from '@/validation/protocols/currency-validator'

export const makeCurrencyValidator = (): CurrencyValidator => {
  class CurrencyValidatorStub implements CurrencyValidator {
    isValidCurrency (currency: string): boolean {
      return true
    }
  }
  return new CurrencyValidatorStub()
}

interface SutTypes {
  sut: CurrencyValidation
  currencyValidatorStub: CurrencyValidator
}

const makeSut = (): SutTypes => {
  const currencyValidatorStub = makeCurrencyValidator()
  const sut = new CurrencyValidation('valor', currencyValidatorStub)
  return {
    sut,
    currencyValidatorStub
  }
}

describe('Currency Validation', () => {
  test('should return an error if CurrencyValidator returns false', () => {
    const { sut, currencyValidatorStub } = makeSut()
    jest.spyOn(currencyValidatorStub, 'isValidCurrency').mockReturnValueOnce(false)
    const error = sut.validate({ valor: 'invalid_value' })
    expect(error).toEqual(new InvalidParamError('valor'))
  })

  test('should call CurrencyValidator with correct value', () => {
    const { sut, currencyValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(currencyValidatorStub, 'isValidCurrency')
    sut.validate({ valor: '100' })
    expect(isValidSpy).toHaveBeenCalledWith('100')
  })

  test('should throw if CurrencyValidator throws', () => {
    const { sut, currencyValidatorStub } = makeSut()
    jest.spyOn(currencyValidatorStub, 'isValidCurrency').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
