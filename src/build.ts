import fastify from 'fastify'
import routes from './routes'
import Services from './services'
import { config } from 'dotenv'
import fastifyCors from '@fastify/cors'

config()

interface ServerOptions {
  prefix?: string
}

export default function build (opts?: ServerOptions) {
  const app = fastify({
    logger: process.env.LOGS_DISABLED === '1' ? false : {
      level: process.env.LOG_LEVEL || 'debug',
      prettyPrint: ['development', 'local'].includes(process.env.ENVIRONMENT || '')
    }
  })

  app.register(fastifyCors)
  app.decorate('Services', Services)
  app.register(routes, { prefix: opts?.prefix })

  return app
}
