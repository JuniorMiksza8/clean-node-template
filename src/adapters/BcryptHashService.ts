import { HashService } from '../ports/HashService'
import { genSalt, hash as BcryptHash } from 'bcrypt'

export class BcryptHashService implements HashService {
  private saltRounds = 10

  async hash(text: string) {
    const salt = await genSalt(this.saltRounds)

    const hash = await BcryptHash(text, salt)

    return {
      hash,
      salt,
    }
  }
}
