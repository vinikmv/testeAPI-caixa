import { HttpRequest, HttpResponse, Controller, AddAccount, Validation, Authentication } from './signup-controller-protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      await this.addAccount.add({
        email,
        password
      })
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return ok({ accessToken })
    } catch (err) {
      return serverError(err)
    }
  }
}
