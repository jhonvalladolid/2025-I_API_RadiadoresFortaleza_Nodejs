const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../middlewares/authenticateToken');
const checkRole = require('../middlewares/checkRole');

router.get('/listado', authenticateToken, checkRole(['admin', 'user']), clientController.getClientes);
router.post('/registrar', authenticateToken, checkRole(['admin', 'user']), clientController.registerCliente);
router.put('/actualizar', authenticateToken, checkRole(['admin', 'user']), clientController.updateCliente);
router.delete('/eliminar/:identificacion', authenticateToken, checkRole(['admin']), clientController.deleteCliente);

module.exports = router;
