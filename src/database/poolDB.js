const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log('🚀 Conexión exitosa con PostgreSQL usando pg Pool.'))
  .catch((err) => console.error('❌ Error al conectar con PostgreSQL:', err.message));

module.exports = pool;
