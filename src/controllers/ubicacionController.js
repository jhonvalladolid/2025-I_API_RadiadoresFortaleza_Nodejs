const ubicacionService = require('../services/ubicacionService');

const getDistritos = async (req, res) => {
  try {
    const distritos = await ubicacionService.listarDistritos();

    if (!distritos.length) {
      return res.status(404).json({ message: 'No se encontraron distritos disponibles' });
    }

    res.status(200).json({ distritos });
  } catch (err) {
    console.error('❌ Error en getDistritos:', err.message);
    res.status(500).json({ error: 'No se pudo obtener el listado de distritos' });
  }
};

module.exports = { getDistritos };
