
import models from './../models'
import lazyLoad from './../common/lazy-load'
import AuthService from './auth'
import JwtService from './jwt'

export type ServiceParams = {
  models: () => typeof models,
  services: typeof Services
}
const serviceParams = {
  models: lazyLoad(() => models)
} as ServiceParams

const Services = {
  config: lazyLoad((config: ServiceParams) => config, serviceParams),
  auth: lazyLoad((params: ServiceParams) => new AuthService(params), serviceParams),
  jwt: lazyLoad((params: ServiceParams) => new JwtService(params), serviceParams)
}

serviceParams.services = Services

export default Services
