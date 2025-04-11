const clientService = require('../services/clientService');

const getClientes = async (req, res) => {
  try {
    const { codigo = null, identificacion = null, razon_social = null } = req.query;

    const clientes = await clientService.listClientes(codigo, identificacion, razon_social);

    if (!clientes.length) {
      return res.status(404).json({ message: 'No se encontraron clientes con los criterios proporcionados' });
    }

    res.status(200).json({ clientes });
  } catch (err) {
    console.error('❌ Error en getClientes:', err.message);
    res.status(500).json({ error: 'No se pudo obtener el listado de clientes' });
  }
};

const registerCliente = async (req, res) => {
  try {
    const datos = req.body;

    // Usuario autenticado desde token, limitamos a 6 caracteres para anx_usa
    const usuario = req.user?.firstName?.substring(0, 6) || 'sistem';

    const registrado = await clientService.registerCliente({ ...datos, usuario });

    if (registrado === 1) {
      return res.status(201).json({ message: 'Cliente registrado correctamente' });
    }

    if (registrado === 2) {
      return res.status(409).json({ message: 'El cliente ya está registrado' });
    }

    res.status(400).json({ message: 'No se pudo registrar el cliente' });
  } catch (err) {
    console.error('❌ Error en registerCliente:', err.message);
    res.status(500).json({ error: 'Error al registrar el cliente' });
  }
};

const updateCliente = async (req, res) => {
  try {
    const datos = req.body;
    const usuario = req.user?.firstName || 'sistema';

    const actualizado = await clientService.updateCliente({ ...datos, usuario });

    if (actualizado === 1) {
      return res.status(200).json({ message: 'Cliente actualizado correctamente' });
    }

    res.status(404).json({ message: 'Cliente no encontrado o no se pudo actualizar' });
  } catch (err) {
    console.error('❌ Error en updateCliente:', err.message);
    res.status(500).json({ error: 'No se pudo actualizar el cliente' });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const { identificacion } = req.params;

    if (!identificacion) {
      return res.status(400).json({ error: 'Se requiere una identificación válida' });
    }

    const eliminado = await clientService.deleteCliente(identificacion);

    if (eliminado === 1) {
      return res.status(200).json({ message: 'Cliente eliminado correctamente' });
    }

    res.status(404).json({ message: 'Cliente no encontrado o no se puede eliminar (facturado)' });
  } catch (err) {
    console.error('❌ Error en deleteCliente:', err.message);
    res.status(500).json({ error: 'No se pudo eliminar el cliente' });
  }
};

module.exports = { getClientes, registerCliente, updateCliente, deleteCliente };
