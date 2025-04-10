const pool = require('../database/poolDB');

const listClientes = async (codigo = null, identificacion = null, razonSocial = null) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sp_movil_clientes_listado($1, $2, $3)',
      [
        codigo?.trim() || null,
        identificacion?.trim() || null,
        razonSocial?.trim() || null
      ]
    );

    return result.rows;
  } catch (error) {
    console.error('❌ Error en listClientes:', error.message);
    throw new Error('Error al listar clientes');
  }
};

module.exports = { listClientes };
