import { CashFlowModel } from '@/domain/models/cash-flow'

export interface LoadCashFlow {
  load: (accountId: string) => Promise<CashFlowModel[]>
}
