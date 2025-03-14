const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const checkRole = require('../middlewares/checkRole');
const roleController = require('../controllers/roleController');

// Obtener todos los roles (Requiere autenticación y ser admin)
router.get('/', authenticateToken, checkRole(['admin']), roleController.getRoles);

// Obtener un rol por ID (Solo admins)
router.get('/:id', authenticateToken, checkRole(['admin']), roleController.getRole);

// Crear un nuevo rol (Solo admins)
router.post('/', authenticateToken, checkRole(['admin']), roleController.createRole);

// Actualizar un rol existente (Solo admins)
router.put('/:id', authenticateToken, checkRole(['admin']), roleController.updateRole);

// Eliminar un rol (Solo admins)
router.delete('/:id', authenticateToken, checkRole(['admin']), roleController.deleteRole);

module.exports = router;
