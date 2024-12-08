const Role = require('../models/roleModel'); // Importar el modelo Role

exports.getAllRoles = async () => {
  // Obtener todos los roles
  return await Role.findAll();
};

exports.createRole = async (data) => {
  // Crear un nuevo rol
  return await Role.create(data);
};

exports.getRoleById = async (id) => {
  // Obtener un rol por ID
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');
  return role;
};

exports.updateRole = async (id, data) => {
  // Actualizar un rol existente
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');
  return await role.update(data);
};

exports.deleteRole = async (id) => {
  // Eliminar un rol por ID
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');
  return await role.destroy();
};
