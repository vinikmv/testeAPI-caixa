import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { TypeValidator } from '@/validation/protocols/type-validator'

export class TypeValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly typeValidator: TypeValidator) {}

  validate (input: any): Error {
    const isValid = this.typeValidator.isValidType(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
