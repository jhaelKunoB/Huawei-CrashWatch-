const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');


require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({ limit: '10mb', extended: true }));


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Connected to the database');
}).on('error', (err) => {
  console.error('Database connection error:', err);
});

// app.listen(3005, () => {
//     console.log('Server is running on port 3005');
//   });

module.exports = pool;