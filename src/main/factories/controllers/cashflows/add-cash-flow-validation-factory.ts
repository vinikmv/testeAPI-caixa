import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeAddCashFlowValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['categoria', 'tipo', 'valor', 'descricao']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
