import { Hasher } from '@/data/protocols/cryptography/hasher'
import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {}
  async add (account: AddAccountParams): Promise<AccountModel> {
    await this.hasher.hash(account.password)
    return await Promise.resolve(null)
  }
}
