import { ServiceParams } from '.'
import bcrypt from 'bcrypt'
import { Unauthorized } from 'http-errors'

class AuthService {
  models: ServiceParams['models']
  services: ServiceParams['services']

  constructor (params: ServiceParams) {
    this.models = params.models
    this.services = params.services
  }

  async auth (email: string, password: string): Promise<string | undefined> {
    const employee = await this.models().Empleado.findOne({
      where: { email }
    })
    if (employee === null) {
      throw new Unauthorized('Wrong user or password')
    }

    const isValid = await bcrypt.compare(password, employee.password)
    if (!isValid) {
      throw new Unauthorized('Wrong user or password')
    }

    return await this.services.jwt().sign({
      codigo: employee.codigo,
      codigo_puesto_laboral: employee.codigo_puesto_laboral
    })
  }
}

export default AuthService
