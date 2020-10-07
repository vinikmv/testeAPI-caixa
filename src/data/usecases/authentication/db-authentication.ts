import { LoadAccountByEmailRepository } from '@/data/protocols/db/add-account/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '@/domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return null
  }
}
