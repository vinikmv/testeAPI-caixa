import { AddCashFlowParams } from '@/domain/usecases/cash-flow/add-cash-flow'

export interface AddCashFlowRepository {
  add: (account: AddCashFlowParams) => Promise<void>
}
