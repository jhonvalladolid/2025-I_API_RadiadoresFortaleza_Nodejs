const User = require('./userModel'); // Importar el modelo User
const Role = require('./roleModel'); // Importar el modelo Role

const initModels = () => {
  // Relación: Un rol tiene muchos usuarios
  Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users', // Alias para la relación
  });

  // Relación: Un usuario pertenece a un rol
  User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role', // Alias para la relación
  });
};

module.exports = initModels;
