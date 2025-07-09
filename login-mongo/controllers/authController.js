import User from "../models/User.js";
import bcrypt from "bcrypt";

// Registro
export const register = async (req, res) => {
  const { username, password, pregunta, respuesta } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedRespuesta = await bcrypt.hash(respuesta, 10);

  try {
    const newUser = new User({
      username,
      password: hashedPassword,
      pregunta_seguridad: pregunta,
      respuesta_seguridad: hashedRespuesta
    });

    await newUser.save();
    res.status(201).send("Usuario registrado");
  } catch (err) {
    res.status(400).send("Error al registrar: " + err.message);
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).send("Usuario no encontrado");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Contraseña incorrecta");

    res.send("Login exitoso");
  } catch (err) {
    res.status(500).send("Error en el login");
  }
};


// Verificar usuario
export const verificarUsuario = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(404).send("No existe");

  res.send({ pregunta: user.pregunta_seguridad });
};

// Verificar respuesta
export const verificarRespuesta = async (req, res) => {
  const { username, respuesta } = req.body;
  const user = await User.findOne({ username });

  const match = await bcrypt.compare(respuesta, user.respuesta_seguridad);
  if (!match) return res.status(401).send("Respuesta incorrecta");

  res.send("Respuesta válida");
};

// Cambiar contraseña
export const cambiarPassword = async (req, res) => {
  const { username, nuevaPassword } = req.body;

  const hashed = await bcrypt.hash(nuevaPassword, 10);
  await User.updateOne({ username }, { password: hashed });

  res.send("Contraseña actualizada");
};

// Obtener todos los usuarios (sin mostrar contraseñas ni respuestas)
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({}, 'username pregunta_seguridad createdAt updatedAt');
    res.json(usuarios);
  } catch (err) {
    res.status(500).send("Error al obtener usuarios");
  }
};
