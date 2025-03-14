const userService = require('../services/userService');

// Asignar rol a usuario
const assignRole = async (req, res) => {
  try {
    const { userId, roleName } = req.body;
    const updatedUser = await userService.assignUserRole(userId, roleName);
    return res.json({ message: 'Rol asignado exitosamente', user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Obtener datos del usuario autenticado
const getUserProfile = async (req, res) => {
  try {
    const user = await userService.findUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    return res.json({ message: 'Datos de usuario obtenidos', user });
  } catch (err) {
    return res.status(500).json({ error: 'Error obteniendo usuario' });
  }
};

// Permitir que un usuario autenticado agregue una contraseña si no la tiene
const setPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const response = await userService.setUserPassword(req.user.id, password);
    return res.json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Permitir que un usuario autenticado cambie su contraseña
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const response = await userService.changeUserPassword(req.user.id, oldPassword, newPassword);
    return res.json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Permitir que un usuario autenticado actualice su perfil
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const updatedUser = await userService.updateUserProfile(req.user.id, firstName, lastName);
    return res.json({ message: 'Perfil actualizado correctamente', user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};

module.exports = { assignRole, getUserProfile, setPassword, changePassword, updateProfile };
