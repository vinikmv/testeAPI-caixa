import { CashFlowModel } from '@/domain/models/cash-flow'

export interface LoadCashFlowRepository {
  loadAll: (accountId: string) => Promise<CashFlowModel[]>
}
