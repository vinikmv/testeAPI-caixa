import { Authentication } from '@/domain/usecases/account/authentication'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '@/presentation/protocols'

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
      await this.authentication.auth(email, password)
    } catch (err) {
      return serverError(err)
    }
  }
}
