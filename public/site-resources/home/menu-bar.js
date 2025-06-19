document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu-categorias');

  const categorias = [
    {
      nombre: "BICICLETAS",
      id: "bicicletas",
      subcategorias: [
        { nombre: "URBANAS", id: "urbanas" },
        { nombre: "MONTAÑA", id: "montana" },
        { nombre: "RUTA", id: "ruta" },
        { nombre: "GRAVEL", id: "gravel" },
        { nombre: "E-BIKE", id: "ebike" }
      ]
    },
    {
      nombre: "ACCESORIOS",
      id: "accesorios",
      subcategorias: [
        { nombre: "ASIENTOS", id: "asientos" },
        { nombre: "BALATAS", id: "balatas" },
        { nombre: "BOMBAS Y CÁMARAS", id: "bombas-camaras" },
        { nombre: "CADENAS", id: "cadenas" },
        { nombre: "PEDALES", id: "pedales" },
        { nombre: "HERRAMIENTA", id: "herramienta" }
      ]
    },
    {
      nombre: "ROPA",
      id: "ropa",
      subcategorias: [
        { nombre: "CALCETINES", id: "calcetines" },
        { nombre: "CHAMARRAS", id: "chamarras" },
        { nombre: "CASCOS", id: "cascos" },
        { nombre: "GUANTES", id: "guantes" },
        { nombre: "ZAPATILLAS", id: "zapatillas" }
      ]
    }
  ];

  categorias.forEach(categoria => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `site-resources/plp/plp.html?categoria=${categoria.id}`;
    a.textContent = categoria.nombre;
    li.appendChild(a);

    const ulSub = document.createElement('ul');

    categoria.subcategorias.forEach(sub => {
      const subLi = document.createElement('li');
      const subA = document.createElement('a');
      subA.href = `site-resources/plp/plp.html?categoria=${categoria.id}&subcategoria=${sub.id}`;
      subA.textContent = sub.nombre;
      subLi.appendChild(subA);
      ulSub.appendChild(subLi);
    });

    li.appendChild(ulSub);
    menu.appendChild(li);
  });
});
