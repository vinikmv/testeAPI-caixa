import { Hasher } from '@/data/protocols/cryptography/hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {

  }

  async hash (plaintext: string): Promise<string> {
    const hash = await bcrypt.hash(plaintext, this.salt)
    return hash
  }
}
