const app = require('./app');
const loadEnv = require('./utils/dotenvConfig');
const db = require('./database/db');
const initModels = require('./models/initModels'); // Importar archivo de relaciones

// Cargar variables de entorno
loadEnv();

// Configurar el puerto y host del servidor
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces

// Inicializar modelos y registrar relaciones
initModels(); // Registrar relaciones entre los modelos

// Verificar la conexión a la base de datos, sincronizar y levantar el servidor
(async () => {
  try {
    // Conectar a la base de datos
    await db.authenticate();
    console.log('🚀 Conexión exitosa a la base de datos.');

    // Sincronizar los modelos con la base de datos
    await db.sync({ alter: true }); // { alter: true } asegura que los cambios del modelo se reflejen
    console.log('✅ Modelos sincronizados con la base de datos.');

    // Iniciar el servidor
    app.listen(PORT, HOST, () => {
      console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
    });
  } catch (error) {
    // Manejo de errores en la conexión a la base de datos
    if (error.name === 'SequelizeConnectionError') {
      console.error('❌ Error de conexión a la base de datos:', error.message);
    } else {
      console.error('❌ Error inesperado:', error.message);
    }
    process.exit(1); // Detener la aplicación en caso de error crítico
  }
})();
