import validator from 'validator'
import { CurrencyValidatorAdapter } from '@/infra/validators/currency-validator-adapter'

jest.mock('validator', () => ({
  isCurrency (): boolean {
    return true
  }
}))

const makeSut = (): CurrencyValidatorAdapter => {
  return new CurrencyValidatorAdapter()
}

describe('CurrencyValidatorAdapter', () => {
  test('Should return false if validator returns false ', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isCurrency').mockReturnValueOnce(false)
    const isValid = sut.isValidCurrency('any_thing')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true ', () => {
    const sut = makeSut()
    const isValid = sut.isValidCurrency('123')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct value', () => {
    const sut = makeSut()
    const isCurrencySpy = jest.spyOn(validator, 'isCurrency')
    sut.isValidCurrency('123')
    expect(isCurrencySpy).toHaveBeenCalledWith('123')
  })
})
