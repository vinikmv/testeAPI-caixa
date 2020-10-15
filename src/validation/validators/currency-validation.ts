import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { CurrencyValidator } from '@/validation/protocols/currency-validator'

export class CurrencyValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly currencyValidator: CurrencyValidator) {}

  validate (input: any): Error {
    const isValid = this.currencyValidator.isValidCurrency(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
