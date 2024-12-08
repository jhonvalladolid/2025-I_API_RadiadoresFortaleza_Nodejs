const app = require('./app');
const loadEnv = require('./utils/dotenvConfig');
const db = require('./database/db');

// Cargar variables de entorno
loadEnv();

// Configurar el puerto
const PORT = process.env.PORT || 3000;

// Verificar la conexión a la base de datos y levantar el servidor
(async () => {
  try {
    // Verificar la conexión a la base de datos
    await db.authenticate();
    console.log('🚀 Conexión exitosa a la base de datos.');

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1); // Detener la aplicación si la base de datos no se conecta
  }
})();
