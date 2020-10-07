import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { TokenGenerator } from '@/data/protocols/cryptography/token-generator'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/add-account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/add-account/update-access-token-repository'
import { Authentication, AuthenticationModel } from '@/domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGegenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGegenerator.generate(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
