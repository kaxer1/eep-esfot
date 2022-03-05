import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

type MenuAtributos = {
  id: number
  id_rol: number,
  cruta: string,
  id_padre: number,
  nombre: string,
  icon: string,
  crear: boolean,
  editar: boolean,
  eliminar: boolean,
  mostrarmenu: boolean,
};

type MenuAtributosCreados = Optional<MenuAtributos, 'id'>;

class Menu extends Model<MenuAtributos, MenuAtributosCreados> {
  declare id: CreationOptional<number>;
  declare id_rol: number;
  declare cruta: string;
  declare id_padre: number;
  declare nombre: string;
  declare icon: string;
  declare crear: boolean;
  declare editar: boolean;
  declare eliminar: boolean;
  declare mostrarmenu: boolean;
}

Menu.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cruta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_padre: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  crear: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  editar: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  eliminar: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  mostrarmenu: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  tableName: 'menu',
  timestamps: false
})

export { Menu };