import { CashFlowResultModel } from '@/domain/models/cash-flow'

export interface LoadCashFlow {
  load: () => Promise<CashFlowResultModel>
}
