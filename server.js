const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const usuariosPath = path.join(__dirname, 'usuarios.json');

app.get('/api/productos', (req, res) => {
  fs.readFile(path.join(__dirname, 'productos.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudieron cargar los productos' });
    }
    res.json(JSON.parse(data));
  });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile(path.join(__dirname, 'usuarios.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });

    const usuarios = JSON.parse(data);
    const usuario = usuarios.find(user => user.correo === email && user.contrasena === password);

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.json({ mensaje: 'Login exitoso', nombre: usuario.usuario });
  });
});


app.post('/api/registro', (req, res) => {
  const nuevoUsuario = req.body;

  fs.readFile(usuariosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ mensaje: 'Error leyendo archivo de usuarios.' });

    let usuarios = [];
    try {
      usuarios = JSON.parse(data);
    } catch (e) {
      return res.status(500).json({ mensaje: 'Formato inválido en usuarios.json' });
    }

    // Verifica que no se repita el correo o usuario
    const existe = usuarios.find(u => u.correo === nuevoUsuario.correo || u.usuario === nuevoUsuario.usuario);
    if (existe) return res.status(400).json({ mensaje: 'El correo o usuario ya están registrados.' });

    usuarios.push(nuevoUsuario);

    fs.writeFile(usuariosPath, JSON.stringify(usuarios, null, 2), err => {
      if (err) return res.status(500).json({ mensaje: 'Error guardando usuario.' });
      res.json({ mensaje: 'Cuenta creada con éxito.' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
