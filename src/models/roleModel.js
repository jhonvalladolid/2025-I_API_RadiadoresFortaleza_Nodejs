const { DataTypes } = require('sequelize');
const sequelizeDB = require('../database/database');

const Role = sequelizeDB.define('Role', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: true }
}, {  tableName: 'roles',  timestamps: true });

module.exports = Role;