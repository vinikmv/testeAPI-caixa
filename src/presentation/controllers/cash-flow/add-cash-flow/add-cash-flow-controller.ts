import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { Controller, HttpRequest, HttpResponse, AddCashFlow } from './add-cash-flow-protocols'

export class AddCashFlowController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addCashFlow: AddCashFlow
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { categoria, tipo, valor, descricao } = httpRequest.body
      await this.addCashFlow.add({
        accountId,
        data: new Date(),
        categoria,
        tipo,
        valor,
        descricao
      })
      return noContent()
    } catch (err) {
      return serverError(new Error())
    }
  }
}
