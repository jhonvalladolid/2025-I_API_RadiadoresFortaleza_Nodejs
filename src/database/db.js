const { Sequelize } = require('sequelize');
const loadEnv = require('../utils/dotenvConfig');

// Cargar las variables de entorno
loadEnv();

// Crear una instancia de Sequelize para PostgreSQL
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
  port: process.env.DB_PORT || 5432,
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
});

// Verificar la conexión
(async () => {
  try {
    await db.authenticate();
    console.log('🚀 Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
  }
})();

module.exports = db;
