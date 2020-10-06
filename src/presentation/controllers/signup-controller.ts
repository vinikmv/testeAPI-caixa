import { HttpRequest, HttpResponse, Controller, EmailValidator } from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor (private readonly emailValidation: EmailValidator) {

  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidation.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (err) {
      return serverError()
    }
  }
}
