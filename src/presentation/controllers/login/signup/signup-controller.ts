import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-controller-protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidation: EmailValidator,
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
      const isValid = this.emailValidation.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
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
