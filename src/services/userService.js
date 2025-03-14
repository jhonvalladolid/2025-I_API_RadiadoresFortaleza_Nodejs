const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Role = require('../models/roleModel');

// Obtener usuario por ID (Sin exponer la contraseña)
const findUserById = async (userId) => {
  return await User.findOne({
    where: { id: userId },
    include: Role,
    attributes: ['id', 'firstName', 'lastName', 'email', 'roleId'] // 🔹 Sin password
  });
};

// Obtener usuario por Email (Solo para autenticación)
const findUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    include: Role,
    attributes: ['id', 'firstName', 'lastName', 'email', 'roleId', 'password'] // ⚠️ Se usa solo en autenticación
  });
};

// Asignar rol a un usuario
const assignUserRole = async (userId, roleName) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new Error('Usuario no encontrado');

  const role = await Role.findOne({ where: { name: roleName } });
  if (!role) throw new Error('Rol no válido');

  user.roleId = role.id;
  await user.save();

  return await findUserById(userId);
};

// Permitir a usuarios autenticados agregar una contraseña (si no tienen una)
const setUserPassword = async (userId, newPassword) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new Error('Usuario no encontrado');

  if (user.password) throw new Error('Este usuario ya tiene una contraseña. Usa "changePassword" para cambiarla.');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashedPassword });

  return { message: 'Contraseña configurada exitosamente.' };
};

// Permitir a usuarios autenticados cambiar su contraseña
const changeUserPassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new Error('Usuario no encontrado');

  if (!user.password) throw new Error('Este usuario no tiene una contraseña configurada. Usa "setPassword" primero.');

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error('La contraseña actual es incorrecta.');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashedPassword });

  return { message: 'Contraseña cambiada exitosamente.' };
};

// Actualizar perfil del usuario autenticado
const updateUserProfile = async (userId, firstName, lastName) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new Error('Usuario no encontrado');

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  await user.save();

  return await findUserById(userId);
};

module.exports = { findUserById, findUserByEmail, assignUserRole, setUserPassword, changeUserPassword, updateUserProfile };
