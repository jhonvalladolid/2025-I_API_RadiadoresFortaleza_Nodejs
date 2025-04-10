const clientService = require('../services/clientService');

const getClientes = async (req, res) => {
  try {
    const { identificacion = null, razon_social = null } = req.query;

    const clientes = await clientService.listClientes(identificacion, razon_social);

    if (!clientes.length) {
      return res.status(404).json({ message: 'No se encontraron clientes con los criterios proporcionados' });
    }

    res.status(200).json({ clientes });
  } catch (err) {
    console.error('❌ Error en getClientes:', err.message);
    res.status(500).json({ error: 'No se pudo obtener el listado de clientes' });
  }
};

module.exports = { getClientes };
