const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acceso denegado, no tienes permisos suficientes' });
    }
    next();
  };
};

module.exports = checkRole;