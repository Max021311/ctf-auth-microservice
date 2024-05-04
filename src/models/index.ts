'use strict'

import * as Sequelize from 'sequelize'
import config from './../config/db'
import buildEmpleado from './empleado'

const sequelize = new Sequelize.Sequelize(config as Sequelize.Options)

const db = {
  sequelize,
  Sequelize,
  Empleado: buildEmpleado(sequelize)
}

Object.keys(db).forEach((modelName) => {
  if(db[modelName]?.associate) {
    db[modelName].associate(db)
  }
})

export type Models = typeof db
export default db
