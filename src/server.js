require('dotenv').config();
const app = require('./app');
const sequelizeDB = require('./database/database');
const Role = require('./models/roleModel');

// Configurar el puerto y host del servidor
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces

// Verificar la conexión a la base de datos, sincronizar y levantar el servidor
(async () => {
  try {
    // Sincronizar los modelos con la base de datos
    await sequelizeDB.sync({ alter: true }); // { alter: true } asegura que los cambios del modelo se reflejen
    console.log('✅ Modelos sincronizados con la base de datos.');

    // Crear roles iniciales si no existen
    const roles = ['admin', 'user', 'client'];

    for (const roleName of roles) {
      await Role.findOrCreate({ where: { name: roleName } });
    }

    console.log('✅ Roles iniciales asegurados.');

    // Iniciar el servidor
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1); // Cierra la aplicación en caso de error crítico
  }
})();
