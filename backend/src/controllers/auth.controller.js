const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

//para registrarse(usuario no existe)
exports.register = async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !email ||!name || !password) {
    return res
      .status(400)
      .json({ message: 'se requieren todos los campos.' });
  }

  try {
    // Verificar si ya existe el usuario
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: 'Usuario o email ya registrado.' });
    }

    // Encriptar la contraseña
    //más grande el valor más robusto el hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    const [userResult] = await pool.query(
      'INSERT INTO users (username , password, name, email) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, name, email]
    );

    res
      .status(201)
      .json({ message: 'Usuario registrado', userId: userResult.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario', details: err });
  }
};

//para logearse(usuario ya existe)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // Validación básica
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email y contraseña son requeridos.' });
  }

  try {
    // 1️⃣ Ejecutar query para traer usuario + roles (JOIN)
    const [rows] = await pool.query(
      `SELECT u.id, u.username, u.password, r.name AS role
       FROM users u
       LEFT JOIN user_roles ur ON u.id = ur.user_id
       LEFT JOIN roles r ON ur.role_id = r.id
       WHERE u.email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    
    const { id, username, password: hashedPassword } = rows[0]; 

    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const roles = rows.map((row) => row.role).filter(Boolean); 

    // 5️⃣ Generar el token JWT
    const token = jwt.sign(
      { id, username, roles }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } 
    );

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};