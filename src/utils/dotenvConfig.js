const dotenv = require('dotenv');

const loadEnv = () => {
  const result = dotenv.config();
  if (result.error) {
    console.error('❌ Error cargando el archivo .env:', result.error.message);
    process.exit(1); // Detener la aplicación si no se puede cargar el archivo .env
  } else {
    console.log('✅ Variables de entorno cargadas correctamente.');
  }
};

module.exports = loadEnv;
