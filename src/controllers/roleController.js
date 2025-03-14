const roleService = require('../services/roleService');

// Obtener todos los roles
const getRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un rol por ID
const getRole = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    res.json(role);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear un nuevo rol
const createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json({ message: 'Rol creado exitosamente', role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un rol existente
const updateRole = async (req, res) => {
  try {
    const updatedRole = await roleService.updateRole(req.params.id, req.body);
    res.json({ message: 'Rol actualizado exitosamente', role: updatedRole });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un rol
const deleteRole = async (req, res) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getRoles, getRole, createRole, updateRole, deleteRole };
