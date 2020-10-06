import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    try {
      if (!email) {
        return await Promise.resolve(badRequest(new MissingParamError('email')))
      }
      if (!password) {
        return await Promise.resolve(badRequest(new MissingParamError('password')))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return await Promise.resolve(badRequest(new InvalidParamError('email')))
      }
    } catch (err) {
      return serverError(err)
    }
  }
}
