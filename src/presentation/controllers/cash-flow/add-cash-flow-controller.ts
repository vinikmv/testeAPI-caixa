import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { Controller, HttpRequest, HttpResponse } from './add-cash-flow-protocols'

export class AddCashFlowController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(new Error())
    }
    return null
  }
}
