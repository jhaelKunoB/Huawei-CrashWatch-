const express = require('express'); // Para crear el servidor
const { Pool } = require('pg'); // Para conectarse a la base de datos
const cors = require('cors'); // Para manejar CORS, permite peticiones desde otros servidores
const bcrypt = require('bcrypt'); // Para encriptar contraseñas

require('dotenv').config(); // Para gestionar variables de entorno

const app = express();
//app.use(express.json()); // Para manejar JSON en las peticiones

// Middleware para manejar CORS
app.use(cors());

// Middleware para manejar JSON en las peticiones con límite de 10mb
app.use(express.json({ limit: '10mb' }));

// Middleware para manejar formularios URL-encoded con límite de 10mb
app.use(express.urlencoded({ limit: '10mb', extended: true }));


const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'CrashWatch',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5433,
});

// Verifica la conexión a la base de datos
pool.on('connect', () => {
  console.log('Connected to the database');
}).on('error', (err) => {
  console.error('Database connection error:', err);
});



// peticion que devuelve todos los eventos
app.get('/roles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Rol"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//post de roles, dado que         body: JSON.stringify(rol), en api_invoker, rol es un objeto con un atributo name
app.post('/register-role', async (req, res) => {
  const { name } = req.body;
  console.log('Rol desde api :', name);
  try {
    const query = 'INSERT INTO "Rol" (name) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [name]); // Se ejecuta la consulta SQL con el nombre del rol

    res.status(201).json(result.rows[0]);
    } catch (error) {
    console.error('Error creating rol:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});





// peticion de las categorias
app.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Category"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// peticion de imagenes de todos los eventos
app.get('/photos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Photo"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario con ese email existe
    const query = 'SELECT * FROM "User" WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si la contraseña coincide, devolver los datos del usuario (sin la contraseña)
    res.status(200).json({
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

// Ruta para obtener todos los usuarios (sin incluir las contraseñas)
app.get('/users', async (req, res) => {
  try {
    // Obtener todos los usuarios sin devolver la contraseña
    const query = 'SELECT * FROM "User"';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// Inicia el servidor en el puerto 3000
app.listen(3005, () => {
    console.log('Server is running on port 3005');
  });

// Exportar el pool para que lo uses en otros archivos si lo necesitas
module.exports = pool;





