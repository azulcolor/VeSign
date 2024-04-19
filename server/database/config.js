import { createPool } from 'mysql2/promise';
import 'dotenv/config';

export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

export const getConnection = async () => {
  try {
    await pool.getConnection();

    console.log('Database is connected');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to database');
  }
};
