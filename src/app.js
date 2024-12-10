const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const roleRoutes = require('./routes/roleRoutes');
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

// Rutas principales
app.use('/api/roles', roleRoutes); // Rutas relacionadas con roles
app.use('/api/users', userRoutes); // Rutas relacionadas con usuarios

// Ruta raíz para verificar el funcionamiento del servidor
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Servidor funcionando correctamente 🚀' });
});

module.exports = app;
