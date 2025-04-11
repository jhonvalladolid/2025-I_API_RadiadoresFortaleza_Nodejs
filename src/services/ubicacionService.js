const pool = require('../database/poolDB');

const listarDistritos = async () => {
  try {
    const result = await pool.query('SELECT * FROM sp_movil_distritos_listado()');
    return result.rows;
  } catch (error) {
    console.error('❌ Error al listar distritos:', error.message);
    throw new Error('Error al obtener el listado de distritos');
  }
};

module.exports = { listarDistritos };
