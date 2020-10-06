import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await Promise.resolve(badRequest(new MissingParamError('email')))
  }
}
