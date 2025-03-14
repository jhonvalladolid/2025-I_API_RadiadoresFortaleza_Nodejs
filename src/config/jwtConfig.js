const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('La variable de entorno JWT_SECRET no está definida.');
}

module.exports = { secretKey };