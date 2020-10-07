import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/add-account/load-account-by-token-repository'
import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      await this.loadAccountByTokenRepository.loadByToken(token)
    }
    return null
  }
}
