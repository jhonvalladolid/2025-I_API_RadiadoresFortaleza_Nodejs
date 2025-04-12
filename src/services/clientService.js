const pool = require('../database/poolDB');

const listClientes = async (codigo = null, nro_dni = null, razonSocial = null) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sp_movil_clientes_listado($1, $2, $3)',
      [
        codigo?.trim() || null,
        nro_dni?.trim() || null,
        razonSocial?.trim() || null
      ]
    );
    return result.rows;
  } catch (error) {
    console.error('❌ Error en listClientes:', error.message);
    throw new Error('Error al listar clientes');
  }
};

const registerCliente = async (datos) => {
  try {
    const result = await pool.query(
      'SELECT sp_movil_clientes_registrar($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        datos.tipo_identificacion,
        datos.nro_dni,
        datos.nro_ruc,
        datos.razon_social,
        datos.direccion,
        datos.distrito,
        datos.web,
        datos.email,
        datos.telefono,
        datos.celular,
        datos.usuario
      ]
    );
    return result.rows[0].sp_movil_clientes_registrar;
  } catch (error) {
    console.error('❌ Error en registerCliente:', error.message);
    throw new Error('Error al registrar cliente');
  }
};

const updateCliente = async (datos) => {
  try {
    const result = await pool.query(
      'SELECT sp_movil_clientes_actualizar($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        datos.tipo_identificacion,
        datos.nro_dni,
        datos.nro_ruc,
        datos.razon_social,
        datos.direccion,
        datos.distrito,
        datos.web,
        datos.email,
        datos.telefono,
        datos.celular,
        datos.usuario
      ]
    );
    return result.rows[0].sp_movil_clientes_actualizar;
  } catch (error) {
    console.error('❌ Error en updateCliente:', error.message);
    throw new Error('Error al actualizar cliente');
  }
};

const deleteCliente = async (nro_dni) => {
  try {
    const result = await pool.query(
      'SELECT sp_movil_clientes_eliminar($1)',
      [nro_dni]
    );
    return result.rows[0].sp_movil_clientes_eliminar;
  } catch (error) {
    console.error('❌ Error en deleteCliente:', error.message);
    throw new Error('Error al eliminar cliente');
  }
};

module.exports = { listClientes, registerCliente, updateCliente, deleteCliente };
