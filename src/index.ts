import build from './build'
import { config } from 'dotenv'
config()

async function main () {
  const server = build({ prefix: process.env.PREFIX ?? '/api' })
  await server.listen({
    host: process.env.HOST ?? '0.0.0.0',
    port: Number(process.env.SERVER_PORT || 3010)
  })

  console.log(server.printRoutes())
}

main()
