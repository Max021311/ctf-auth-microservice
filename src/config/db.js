const {
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_USER,
  DB_PORT
} = process.env

const config = {
  username: DB_USER || 'postgres',
  password: DB_PASSWORD || 'postgres',
  database: DB_NAME || 'postgres',
  host: DB_HOST || '127.0.0.1',
  port: DB_PORT || 5432,
  dialect: 'postgresql',
  logging:  false
}

module.exports = {
  default: config,
  ...config
}
