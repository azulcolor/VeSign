// scripts/start.js
import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Obtener el valor del puerto desde el archivo .env
const PORT = process.env.FRONTEND_PORT || 3000;

// Ejecutar el comando next dev
execSync(`next start -p ${PORT} ./view`, { stdio: 'inherit' });