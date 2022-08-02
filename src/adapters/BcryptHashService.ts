import { HashService } from '../ports/HashService'
import { genSalt, hash as BcryptHash, compare as BcryptCompare } from 'bcrypt'

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

  async compare(hash: string, toCompareString: string) {
    return BcryptCompare(toCompareString, hash)
  }

}
