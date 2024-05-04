import { ServiceParams } from '.'
import { Unauthorized } from 'http-errors'
import Jwt, { type JwtPayload } from 'jsonwebtoken'

class JwtService {
  models: ServiceParams['models']
  _secret: string

  constructor (params: ServiceParams) {
    this.models = params.models
    this._secret = process.env.SECRET ?? 'loremipsum'
  }

  async sign (data: object): Promise<string | undefined> {
    return await new Promise((resolve, reject) => {
      Jwt.sign(data, this._secret, { expiresIn: '1d' }, (err, encoded) => {
        if (err) {
          return reject(err)
        }
        resolve(encoded)
      })
    })
  }

  async verify (token: string): Promise<string | JwtPayload | undefined> {
    return await new Promise((resolve, reject) => {
      Jwt.verify(token, this._secret, {}, (err, decoded) => {
        if (err) {
          const error = new Unauthorized('Invalid token')
          error.cause = err
          return reject(err)
        }
        resolve(decoded)
      })
    })
  }
}

export default JwtService
