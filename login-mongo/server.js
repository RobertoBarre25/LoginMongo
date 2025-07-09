import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Conectado a MongoDB Atlas"))
  .catch(err => console.error("🔴 Error al conectar a MongoDB:", err));

// Rutas de autenticación
app.use('/api', authRoutes);

// Documentación rápida de rutas
app.get("/", (req, res) => {
  res.send(`
    <h2>🛡️ API de Autenticación</h2>
    <ul>
      <li>POST /api/register</li>
      <li>POST /api/login</li>
      <li>POST /api/verificar-usuario</li>
      <li>POST /api/verificar-respuesta</li>
      <li>PUT /api/cambiar-password</li>
      <li>GET /api/usuarios</li>
    </ul>
  `);
});

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
