import { Hasher, AddAccount, AddAccountParams, AccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {}
  async add (account: AddAccountParams): Promise<AccountModel> {
    await this.hasher.hash(account.password)
    return await Promise.resolve(null)
  }
}
