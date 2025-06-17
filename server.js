const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Middleware para servir archivos estáticos (como index.html y site-resources)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
  const filePath = path.join(__dirname, 'productos.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer productos.json:', err);
      return res.status(500).json({ error: 'No se pudo leer productos.json' });
    }
    try {
      const productos = JSON.parse(data);
      res.json(productos);
    } catch (e) {
      console.error('JSON mal formado en productos.json:', e);
      res.status(500).json({ error: 'JSON mal formado' });
    }
  });
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
