import { ValidationComposite, RequiredFieldValidation, CurrencyValidation, TypeValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddCashFlowValidation } from './add-cash-flow-validation-factory'
import { CurrencyValidator } from '@/validation/protocols/currency-validator'
import { TypeValidator } from '@/validation/protocols/type-validator'

jest.mock('../../../../../validation/validators/validation-composite')

export const makeCurrencyValidator = (): CurrencyValidator => {
  class CurrencyValidatorStub implements CurrencyValidator {
    isValidCurrency (currency: string): boolean {
      return true
    }
  }
  return new CurrencyValidatorStub()
}

export const makeTypeValidator = (): TypeValidator => {
  class TypeValidatorStub implements TypeValidator {
    isValidType (text: string): boolean {
      return true
    }
  }
  return new TypeValidatorStub()
}

describe('AddCashFlowValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCashFlowValidation()
    const validations: Validation[] = []
    for (const field of ['categoria', 'tipo', 'valor', 'descricao']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new TypeValidation('tipo', makeTypeValidator()))
    validations.push(new CurrencyValidation('valor', makeCurrencyValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
