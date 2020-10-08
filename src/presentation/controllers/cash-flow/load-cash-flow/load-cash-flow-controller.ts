import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadCashFlow } from './load-cash-flow-protocols'

export class LoadCashFlowController implements Controller {
  constructor (private readonly loadCashFlow: LoadCashFlow) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const cashFlow = await this.loadCashFlow.load()
      return ok(cashFlow)
    } catch (err) {
      return serverError(err)
    }
  }
}
