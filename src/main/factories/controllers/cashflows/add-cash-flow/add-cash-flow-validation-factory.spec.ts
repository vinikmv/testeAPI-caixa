import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddCashFlowValidation } from './add-cash-flow-validation-factory'
import { CurrencyValidation } from '@/validation/validators/currency-validation'
import { CurrencyValidator } from '@/validation/protocols/currency-validator'

jest.mock('../../../../../validation/validators/validation-composite')

export const makeCurrencyValidator = (): CurrencyValidator => {
  class CurrencyValidatorStub implements CurrencyValidator {
    isValidCurrency (currency: string): boolean {
      return true
    }
  }
  return new CurrencyValidatorStub()
}

describe('AddCashFlowValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCashFlowValidation()
    const validations: Validation[] = []
    for (const field of ['categoria', 'tipo', 'valor', 'descricao']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CurrencyValidation('valor', makeCurrencyValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
