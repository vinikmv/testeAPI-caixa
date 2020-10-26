import { CurrencyValidatorAdapter } from '@/infra/validators/currency-validator-adapter'
import { TypeValidatorAdapter } from '@/infra/validators/type-validator-adapter'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'
import { CurrencyValidation } from '@/validation/validators/currency-validation'
import { TypeValidation } from '@/validation/validators/type-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeAddCashFlowValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['categoria', 'tipo', 'valor', 'descricao']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new TypeValidation('tipo', new TypeValidatorAdapter()))
  validations.push(new CurrencyValidation('valor', new CurrencyValidatorAdapter()))
  return new ValidationComposite(validations)
}
