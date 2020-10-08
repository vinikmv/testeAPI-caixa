import { ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadCashFlow } from './load-cash-flow-protocols'

export class LoadCashFlowController implements Controller {
  constructor (private readonly loadCashFlow: LoadCashFlow) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const cashFlow = await this.loadCashFlow.load()
    return ok(cashFlow)
  }
}
