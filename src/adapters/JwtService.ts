import { sign as JwtSign, verify as JwtVerify } from 'jsonwebtoken'
import { JwtService as JwtServiceType } from '../ports/JwtService'

export class JwtService implements JwtServiceType {

    sign(payload: Record<string, unknown>, expiresIn: number = 60 * 60) {

        const { JWT_SECRET = '', JWT_ISSUER } = process.env

        return JwtSign(payload, JWT_SECRET as string, { expiresIn, issuer: JWT_ISSUER })
    }

    verify(token: string) {

        const { JWT_SECRET = '' } = process.env

        return JwtVerify(token, JWT_SECRET as string) as Record<string, unknown>
    }

}