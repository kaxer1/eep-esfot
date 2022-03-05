import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

type TransaccionesAtributos = {
  ruta: string,
  path: string,
};

type TransaccionesAtributosCreados = Optional<TransaccionesAtributos, 'ruta'>;

class Transacciones extends Model<TransaccionesAtributos, TransaccionesAtributosCreados> {
  declare ruta: CreationOptional<string>;
  declare path: string;
}

Transacciones.init({
  ruta: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'transacciones',
  timestamps: false
})

export { Transacciones };