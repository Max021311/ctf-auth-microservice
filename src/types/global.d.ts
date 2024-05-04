import Services from './../services'
import SequelizeNamespace, { QueryInterface } from 'sequelize'

declare module 'fastify' {
  interface FastifyInstance {
    Services: typeof Services
  }
  interface FastifyRequest {
    user: { codigo: number, codigo_puesto_laboral }
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly ENVIRONMENT: string
    readonly LOG_LEVEL: string
    readonly SERVER_PORT: string
    readonly DB_USER: string | 'postgres',
    readonly DB_PASSWORD: string | 'postgres',
    readonly DB_NAME: string | 'postgres',
    readonly DB_HOST: string | 'localhost',
    readonly SECRET: string | 'loremipsum'
  }
}

export type AnyFunction = (...args: any[]) => any

export type MigrationCallback = (queryInterface: QueryInterface, Sequelize: typeof SequelizeNamespace) => Promise<any>

export interface MigrationOrSeeder {
  up: MigrationCallback,
  down: MigrationCallback
}
