export class JwtService {
    sign: (payload: Record<string, unknown>, expiresIn?: number) => string
    verify: (token: string) => Record<string, unknown>
}