import { AccountModel } from '@/domain/models/account'

export interface AddAccountParams {
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountParams) => AccountModel
}
