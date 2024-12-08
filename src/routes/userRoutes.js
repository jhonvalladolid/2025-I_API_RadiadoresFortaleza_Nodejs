const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Obtener todos los usuarios
router.get('/', userController.getUsers);

// Crear un nuevo usuario
router.post('/', userController.createUser);

// Obtener un usuario por ID
router.get('/:id', userController.getUser);

// Actualizar un usuario por ID
router.put('/:id', userController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
