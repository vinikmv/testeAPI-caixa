import { TypeValidator } from '@/validation/protocols/type-validator'

const regexp = /(?:Entrada|Saída)/

export class TypeValidatorAdapter implements TypeValidator {
  isValidType (text: string): boolean {
    return regexp.test(text)
  }
}
