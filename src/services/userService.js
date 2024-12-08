const User = require('../models/userModel'); // Importar el modelo User
const Role = require('../models/roleModel'); // Importar el modelo Role para incluir la relación

exports.getAllUsers = async () => {
  // Obtener todos los usuarios con su rol asociado
  return await User.findAll({
    include: { model: Role, as: 'role' }, // Incluir el rol asociado
  });
};

exports.createUser = async (data) => {
  // Verificar si el rol está definido en los datos
  if (!data.roleId) {
    // Buscar el rol predeterminado "user"
    const defaultRole = await Role.findOne({ where: { name: 'user' } });
    if (!defaultRole) {
      throw new Error('Default role "user" not found in the database.');
    }

    // Asignar el rol predeterminado
    data.roleId = defaultRole.id;
  }

  // Crear el usuario con el rol asignado
  return await User.create(data);
};

exports.getUserById = async (id) => {
  // Obtener un usuario por ID con su rol asociado
  const user = await User.findByPk(id, {
    include: { model: Role, as: 'role' }, // Incluir el rol asociado
  });
  if (!user) throw new Error('User not found');
  return user;
};

exports.updateUser = async (id, data) => {
  // Actualizar un usuario existente
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return await user.update(data);
};

exports.deleteUser = async (id) => {
  // Eliminar un usuario por ID
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return await user.destroy();
};
