import { FastifyPluginCallback } from 'fastify'
import authRoutes from './auth'

const routePlugin: FastifyPluginCallback = (server, _opts, done) => {
  server.route({
    url: '/ok',
    method: 'GET',
    handler: (_request, reply) => {
      return void reply.code(200).send('ok')
    }
  })
  server.register(authRoutes)
  done()
}

export default routePlugin
