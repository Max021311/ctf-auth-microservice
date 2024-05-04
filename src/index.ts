import build from './build'
import { config } from 'dotenv'
config()

async function main () {
  const server = build({ prefix: '/api' })
  await server.listen(Number(process.env.SERVER_PORT || 3010))

  console.log(server.printRoutes())
}

main()
