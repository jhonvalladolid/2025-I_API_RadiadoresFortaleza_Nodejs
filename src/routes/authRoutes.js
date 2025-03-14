const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de autenticación tradicional (correo y contraseña)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta de autenticación con Google (ID Token)
router.post('/google', authController.googleAuth);

module.exports = router;