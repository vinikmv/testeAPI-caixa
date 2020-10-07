import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async load (accessToken: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
