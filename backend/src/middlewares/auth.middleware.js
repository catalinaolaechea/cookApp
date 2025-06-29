const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Token de acceso requerido" })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Error verificando token:", err)
      return res.status(403).json({ error: "Token inválido" })
    }

    user.id = Number.parseInt(user.id)

    console.log("Usuario autenticado:", {
      id: user.id,
      username: user.username,
      roles: user.roles,
      idType: typeof user.id,
    })

    req.user = user
    next()
  })
}

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Usuario no autenticado" })
    }

    if (!req.user.roles || !req.user.roles.includes(requiredRole)) {
      return res.status(403).json({ error: "No tienes permisos para realizar esta acción" })
    }

    next()
  }
}

module.exports = {
  authenticateToken,
  authorizeRole,
}
