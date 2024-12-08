const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Ruta para verificar el funcionamiento del servidor
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Servidor funcionando correctamente 🚀' });
});

module.exports = app;
