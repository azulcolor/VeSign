import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Obtener el valor del puerto desde el archivo .env
const API = process.env.API_ROUTE

console.log(process.env.NEXT_PUBLIC_API_ROUTE)
export default API;