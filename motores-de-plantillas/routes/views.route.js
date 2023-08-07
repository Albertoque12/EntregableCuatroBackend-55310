import { Router } from 'express';
import { FileManager } from '../data/db.js';
const usuarioManager = new FileManager('./data/usuarios.json');

const route = Router();

route.get('/', (req, res) => {
  const { role } = req.query;
  const food = [
    {
      nombre: 'Manzana',
      precio: 52,
    },
    {
      nombre: 'Banana',
      precio: 15,
    },
    {
      nombre: 'Pera',
      precio: 38,
    },
    {
      nombre: 'Durazno',
      precio: 85,
    },
    {
      nombre: 'Frutilla',
      precio: 120,
    },
  ];
  res.render('index', {
    title: 'hola',
    nombre: 'Fabrizio',
    admin: role === 'admin',
    food,
    style: 'style',
  });
});

route.get('/register', (req, res) => {
  res.render('register', {
    style: 'style',
  });
});

route.get('/users/:id', async (req, res) => {
  const user = await usuarioManager.get(req.params.id);
  if (!user) {
    res.render('notFound', {
      style: 'style',
      entidad: 'Usuario',
    });
    return;
  }
  res.render('viewUsuario', {
    style: 'style',
    user,
  });
});

export default route;
