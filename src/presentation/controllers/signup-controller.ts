import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers/http/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.email) {
      return badRequest(new Error('Missing param: email'))
    }
    if (!httpRequest.body.password) {
      return badRequest(new Error('Missing param: password'))
    }
  }
}
