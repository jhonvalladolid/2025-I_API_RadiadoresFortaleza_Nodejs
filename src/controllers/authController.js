const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Role = require('../models/roleModel');
const { secretKey } = require('../config/jwtConfig');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Función para generar un token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, firstName: user.firstName, role: user.Role.name },
    secretKey,
    { expiresIn: '1h' }
  );
};

// Registro de usuario con correo y contraseña
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está en uso' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Asignar rol "user" por defecto
    const role = await Role.findOne({ where: { name: 'user' } });
    if (!role) {
      return res.status(500).json({ error: 'El rol "user" no está definido en la base de datos' });
    }

    // Crear usuario
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      provider: 'local',
      roleId: role.id,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error en el registro' });
  }
};

// Inicio de sesión con correo y contraseña
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario en la base de datos
    const user = await User.findOne({ where: { email }, include: Role });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // **Si el usuario se registró con Google pero NO ha configurado una contraseña**
    if (user.provider === 'google' && !user.password) {
      return res.status(403).json({ error: 'Debes iniciar sesión con Google o configurar una contraseña.' });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar y enviar token
    const token = generateToken(user);
    res.json({ auth: true, token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

// Inicio de sesión con Google
const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Verificar token de Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload.email || !payload.given_name || !payload.family_name) {
      return res.status(400).json({ error: 'El token de Google no contiene la información necesaria' });
    }

    const { email, given_name: firstName, family_name: lastName } = payload;

    // Buscar usuario en la base de datos
    let user = await User.findOne({ where: { email }, include: Role });

    // Si no existe, crearlo con rol "user"
    if (!user) {
      const role = await Role.findOne({ where: { name: 'user' } });
      if (!role) {
        return res.status(500).json({ error: 'El rol "user" no está definido en la base de datos' });
      }

      user = await User.create({
        firstName,
        lastName,
        email,
        provider: 'google',
        roleId: role.id,
      });

      // Asegurar que se retorne con el rol
      user = await User.findOne({ where: { id: user.id }, include: Role });
    }

    // Generar token
    const token = generateToken(user);
    res.json({ auth: true, token });
  } catch (error) {
    console.error('Error en Google Auth:', error);
    res.status(500).json({ error: 'Error al autenticar con Google' });
  }
};

module.exports = { register, login, googleAuth };
