import express from 'express';
import {
  register,
  login,
  verificarUsuario,
  verificarRespuesta,
  cambiarPassword,
  obtenerUsuarios
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verificar-usuario', verificarUsuario);
router.post('/verificar-respuesta', verificarRespuesta);
router.put('/cambiar-password', cambiarPassword);

// Nueva ruta para obtener usuarios
router.get('/usuarios', obtenerUsuarios);

export default router;
