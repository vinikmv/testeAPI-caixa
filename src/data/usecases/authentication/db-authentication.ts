import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { TokenGenerator } from '@/data/protocols/cryptography/token-generator'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/add-account/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '@/domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGegenerator: TokenGenerator
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
      await this.tokenGegenerator.generate(account.id)
    }
    return null
  }
}
