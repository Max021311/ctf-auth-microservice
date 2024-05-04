import { FastifyPluginCallback } from 'fastify'
import authMiddleware from '../../middleware/auth'

const AuthPlugin: FastifyPluginCallback = (server, _opts, done) => {
  const logger = server.log.child({ filename: __filename })
  server.route<{
    Body: { email: string, password: string },
    Response: { token: string }
  }>({
    method: 'POST',
    url: '/auth',
    schema: {
      body: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email'
          },
          password: {
            type: 'string'
          }
        },
        required: ['email', 'password']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' }
          },
          required: ['token']
        }
      }
    },
    async handler (request, reply) {
      try {
        const token = await request.server.Services.auth().auth(
          request.body.email,
          request.body.password
        )
        reply
          .code(200)
          .send({ token })
      } catch (err) {
        logger.error(err, 'POST /api/auth')
        throw err
      }
    }
  })

  server.route({
    method: 'GET',
    url: '/auth',
    schema: {
      headers: {
        type: 'object',
        properties: {
          authorization: { type: 'string' }
        },
        required: ['authorization']
      }
    },
    preHandler: authMiddleware,
    handler (_request, reply) {
      reply.code(200).send()
      return
    }
  })
  done()
}

export default AuthPlugin
