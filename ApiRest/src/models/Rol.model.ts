import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

type RolAtributos = {
  id: number,
  nombre: string,
  vota: boolean,
};

type RolAtributosCreados = Optional<RolAtributos, 'id'>;

class Rol extends Model<RolAtributos, RolAtributosCreados> {
  declare id: CreationOptional<number>;
  declare nombre: string;
  declare vota: boolean;
}

Rol.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vota: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  tableName: 'rol',
  timestamps: false
})

export { Rol };