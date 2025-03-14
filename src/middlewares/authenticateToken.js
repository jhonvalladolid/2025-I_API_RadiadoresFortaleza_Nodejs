const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwtConfig');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extraer token del header

  if (!token) return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Guardar el usuario decodificado en req.user
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = authenticateToken;