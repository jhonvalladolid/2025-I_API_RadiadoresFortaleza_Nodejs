const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../middlewares/authenticateToken');
const checkRole = require('../middlewares/checkRole');

router.get('/listado', authenticateToken, checkRole(['admin', 'user']), clientController.getClientes);

module.exports = router;
