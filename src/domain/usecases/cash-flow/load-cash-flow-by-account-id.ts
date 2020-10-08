import { CashFlowModel } from '@/domain/models/cash-flow-result'

export interface LoadCashFlowByAccountId {
  loadById: (id: string) => Promise<CashFlowModel>
}
