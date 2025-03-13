const { DataTypes } = require('sequelize');
const sequelizeDB = require('../database/database');
const Role = require('./roleModel');

const User = sequelizeDB.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING },
  provider: { type: DataTypes.STRING, allowNull: false, defaultValue: 'local' },
}, { tableName: 'users', timestamps: true });

// Relación: Un usuario pertenece a un rol
User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = User;