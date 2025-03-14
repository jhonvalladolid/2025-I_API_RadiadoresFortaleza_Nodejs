const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();

// Middleware para analizar cuerpos de solicitud en formato JSON
app.use(express.json());

// Middleware para permitir CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para registrar solicitudes HTTP en la consola
app.use(morgan('dev'));

// Rutas públicas
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.status(200).json({ message: '🚀 Servidor funcionando correctamente' });
});

// Rutas protegidas
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes); // 🔹 Se agregan las rutas de roles

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('❌ Error en el servidor:', err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

module.exports = app;
