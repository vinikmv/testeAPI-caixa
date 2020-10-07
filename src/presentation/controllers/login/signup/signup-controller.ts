import { HttpRequest, HttpResponse, Controller, AddAccount } from './signup-controller-protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const account = await this.addAccount.add({
        email,
        password
      })
      return ok(account)
    } catch (err) {
      return serverError(err)
    }
  }
}
