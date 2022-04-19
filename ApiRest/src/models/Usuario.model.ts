import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

type UsuarioAtributos = {
  id: number
  username: string
  nombre: string
  apellido: string
  cedula: string
  password: string
  email: string
  rol: number
  activo: boolean
  sufrago: boolean
  estudiante: boolean
  createdat: Date | null
  updatedat: Date | null
};

type UsuarioAtributosCreados = Optional<UsuarioAtributos, 'id'>;

class Usuario extends Model<UsuarioAtributos, UsuarioAtributosCreados> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare nombre: string;
  declare apellido: string;
  declare cedula: string;
  declare password: string;
  declare email: string;
  declare rol: number;
  declare activo: boolean;
  declare sufrago: boolean;
  declare estudiante: boolean;  
  declare createdat: CreationOptional<Date> | null;
  declare updatedat: CreationOptional<Date> | null;
}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  rol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  sufrago: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  estudiante: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  createdat: DataTypes.DATE,
  updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  sequelize,
  tableName: 'usuario',
  timestamps: false
})

export { Usuario };