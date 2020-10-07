import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddCashFlowValidation } from './add-cash-flow-validation-factory'

jest.mock('../../../../validation/validators/validation-composite')

describe('AddCashFlowValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCashFlowValidation()
    const validations: Validation[] = []
    for (const field of ['categoria', 'tipo', 'valor', 'descricao']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
