import { CashFlowModel } from '@/domain/models/cash-flow'

export interface LoadCashFlow {
  load: () => Promise<CashFlowModel[]>
}
