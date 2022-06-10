interface HashResponse {
  salt: string
  hash: string
}

export class HashService {
  hash: (data: string) => Promise<HashResponse>
}
