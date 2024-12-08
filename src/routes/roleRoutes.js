const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Obtener todos los roles
router.get('/', roleController.getRoles);

// Crear un nuevo rol
router.post('/', roleController.createRole);

// Obtener un rol por ID
router.get('/:id', roleController.getRole);

// Actualizar un rol por ID
router.put('/:id', roleController.updateRole);

// Eliminar un rol por ID
router.delete('/:id', roleController.deleteRole);

module.exports = router;
