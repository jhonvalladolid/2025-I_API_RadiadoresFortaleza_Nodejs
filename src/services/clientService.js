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

const registerCliente = async (datos) => {
  try {
    const result = await pool.query(
      'SELECT sp_movil_clientes_registrar($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        datos.tipo_identificacion,
        datos.identificacion,
        datos.numero_documento,
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

    return result.rows[0].sp_movil_clientes_registrar; // retorna 1 o 0
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
        datos.identificacion,
        datos.numero_documento,
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

    return result.rows[0].sp_movil_clientes_actualizar; // retorna 1 o 0
  } catch (error) {
    console.error('❌ Error en updateCliente:', error.message);
    throw new Error('Error al actualizar cliente');
  }
};

const deleteCliente = async (identificacion) => {
  try {
    const result = await pool.query(
      'SELECT sp_movil_clientes_eliminar($1)',
      [identificacion]
    );

    return result.rows[0].sp_movil_clientes_eliminar; // 1 o 0
  } catch (error) {
    console.error('❌ Error en deleteCliente:', error.message);
    throw new Error('Error al eliminar cliente');
  }
};

module.exports = { listClientes, registerCliente, updateCliente, deleteCliente };
