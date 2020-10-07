import { Controller, HttpRequest, HttpResponse, Authentication } from './login-protocols'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (err) {
      return serverError(err)
    }
  }
}
