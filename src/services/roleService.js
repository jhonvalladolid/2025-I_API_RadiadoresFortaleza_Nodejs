const Role = require('../models/roleModel');

// Obtener todos los roles
const getAllRoles = async () => {
  return await Role.findAll();
};

// Obtener un rol por ID
const getRoleById = async (roleId) => {
  const role = await Role.findOne({ where: { id: roleId } });
  if (!role) throw new Error('Rol no encontrado');
  return role;
};

// Crear un nuevo rol
const createRole = async (roleData) => {
  return await Role.create(roleData);
};

// Actualizar un rol existente
const updateRole = async (roleId, roleData) => {
  const role = await getRoleById(roleId);
  await role.update(roleData);
  return role;
};

// Eliminar un rol
const deleteRole = async (roleId) => {
  const role = await getRoleById(roleId);
  await role.destroy();
};

module.exports = { getAllRoles, getRoleById, createRole, updateRole, deleteRole };
