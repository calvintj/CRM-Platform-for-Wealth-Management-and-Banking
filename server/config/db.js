const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
  process.exit(1); // Exit the application if DB fails
});

console.log('✅ Connected to PostgreSQL');

module.exports = pool;
