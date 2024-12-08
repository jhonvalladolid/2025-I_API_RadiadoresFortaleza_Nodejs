const { DataTypes } = require('sequelize');
const db = require('../database/db'); // Instancia de Sequelize

const Role = db.define('Role', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'roles',
  timestamps: true,
});

module.exports = Role;
