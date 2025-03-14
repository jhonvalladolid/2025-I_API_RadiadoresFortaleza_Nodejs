const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const checkRole = require('../middlewares/checkRole');
const userController = require('../controllers/userController');

// Ruta solo para administradores
router.get('/admin', authenticateToken, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Bienvenido, admin!', user: req.user });
});

// Ruta para usuarios normales y administradores
router.get('/user', authenticateToken, checkRole(['user', 'admin']), (req, res) => {
  res.json({ message: 'Bienvenido, usuario!', user: req.user });
});

// Ruta para asignar roles (solo admins)
router.post('/assign-role', authenticateToken, checkRole(['admin']), userController.assignRole);

// Ruta para obtener los datos del usuario autenticado
router.get('/user-info', authenticateToken, userController.getUserProfile);

// **Ruta para agregar una contraseña si el usuario no tiene una**
router.post('/set-password', authenticateToken, userController.setPassword);

// **Ruta para cambiar la contraseña si el usuario ya tiene una**
router.post('/change-password', authenticateToken, userController.changePassword);

module.exports = router;
