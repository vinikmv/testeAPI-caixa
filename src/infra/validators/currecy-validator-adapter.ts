import { CurrencyValidator } from '@/validation/protocols/currency-validator'
import validator from 'validator'

export class CurrencyValidatorAdapter implements CurrencyValidator {
  isValidCurrency (currency: string): boolean {
    return validator.isCurrency(currency)
  }
}
