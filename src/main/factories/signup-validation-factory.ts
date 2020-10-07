import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
