const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');
const authenticateToken = require('../middlewares/authenticateToken');

// Ruta protegida por token, sin restricción por rol
router.get('/distritos', authenticateToken, ubicacionController.getDistritos);

module.exports = router;
