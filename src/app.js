const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware para analizar cuerpos de solicitud en formato JSON
app.use(express.json());

// Middleware para permitir CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.10.107'], // Asegúrate de usar tu IP local
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

// Middleware para registrar solicitudes HTTP en la consola
app.use(morgan('dev'));

// Rutas públicas
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Servidor funcionando correctamente 🚀' });
});

// Rutas protegidas
app.use('/api/protected', userRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

module.exports = app;
