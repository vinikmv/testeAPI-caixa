import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-controller-protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidation: EmailValidator,
    private readonly addAccount: AddAccount) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidation.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const validAccount = await this.addAccount.add({
        email,
        password
      })
      return ok(validAccount)
    } catch (err) {
      return serverError()
    }
  }
}
