import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'


export class Empleado extends Model<
    // @ts-ignore
  InferAttributes<Empleado>,
  InferCreationAttributes<Empleado>
>{
  declare codigo: number
  declare rfc: number
  declare nombre: string
  declare apellidos: string
  declare nss: string
  declare curp: string
  declare fecha_nacimiento: Date
  declare codigo_puesto_laboral: number
  declare sueldo: number
  declare password: string
  declare email: string
}

export default function (sequelize: Sequelize) {
  Empleado.init({
    // @ts-ignore
    codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    rfc: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    apellidos: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nss: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      validate: {
        len: [11, 11]
      }
    },
    curp: {
      type: DataTypes.CHAR(18),
      allowNull: false,
      validate: {
        len: [18, 18]
      }

    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    codigo_puesto_laboral: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'puestos_laborales',
        key: 'codigo'
      }
    },
    sueldo: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'empleados',
    sequelize
  })

  return Empleado
}
