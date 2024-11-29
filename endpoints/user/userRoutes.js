const express = require('express');
const router = express.Router();
const pool = require('../../server'); // Asegúrate de importar tu pool de conexión
const bcrypt = require('bcrypt'); // Para encriptar contraseñas

// Endpoint para crear un usuario
router.post('/', async (req, res) => {

    const { name, lastName, email, ci, phone, username, password, address, latitude, longitude, idCounty, idRol } = req.body;
    if (!name || !lastName || !email || !ci || !phone || !username || !password  || !latitude || !longitude || !idCounty || !idRol || !address ) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO "User" (name, lastname, email, ci, phone, username, password, address, latitude, longitude, "idCounty", "idRol") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
        const result = await pool.query(query, [name, lastName, email, ci, phone, username, hashedPassword, address, latitude, longitude, idCounty, idRol]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const query = 'SELECT * FROM "User" WHERE email = $1 OR username = $1';
      const result = await pool.query(query, [email]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      const user = result.rows[0];
      //console.log('User: -- ', user);
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      res.status(201).json({
        message: 'Login exitoso',
        user: {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          date_registration: user.date_registration,
          status: user.status,
        },
      });

      //devolver los datos del usuario (sin la contraseña) si es que la contraseña coincide
      return res.status(200).json({
        message: 'Login exitoso',
        user: {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          date_registration: user.date_registration,
          status: user.status,
        },
      });

    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

module.exports = router;