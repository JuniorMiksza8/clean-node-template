interface HashResponse {
  salt: string
  hash: string
}

export class HashService {
  hash: (data: string) => Promise<HashResponse>
  compare: (hash: string, toCompareString: string) => Promise<boolean>
}
