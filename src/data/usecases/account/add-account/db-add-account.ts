import { AddAccountRepository } from '@/data/protocols/db/add-account/db-add-account-repository'
import { Hasher, AddAccount, AddAccountParams, AccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return await Promise.resolve(null)
  }
}
