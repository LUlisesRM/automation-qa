const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const usuariosPath = path.join(__dirname, 'usuarios.json');

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
