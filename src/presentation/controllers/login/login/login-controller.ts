import { Controller, EmailValidator, HttpRequest, HttpResponse, Authentication } from './login-protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return (badRequest(new InvalidParamError('email')))
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
    } catch (err) {
      return serverError(err)
    }
  }
}
