import { preHandlerAsyncHookHandler } from 'fastify'

const authMiddleware: preHandlerAsyncHookHandler = async (request) => {
  const token = request.headers.authorization?.split?.(' ')?.[1]
  if (token === undefined) { throw new Error('Missing token') }
  const decoded = await request.server.Services.jwt().verify(token)
  request.user = decoded as { codigo: number, codigo_puesto_laboral: number }
}

export default authMiddleware
