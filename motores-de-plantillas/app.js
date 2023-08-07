import cookieParser from 'cookie-parser';
import express from 'express';
import { create } from 'express-handlebars';
import helpers from './lib/helpers.handlebars.js';
import mascotasRoute from './routes/mascotas.route.js';
import peliculasRoute from './routes/peliculas.route.js';
import usuarioRoute from './routes/usuarios.route.js';
import viewsRoute from './routes/views.route.js';
import fileDirName from './utils/fileDirName.js';
const { __dirname } = fileDirName(import.meta);

const app = express();

const hbs = create({
  partialsDir: ['views/partials'],
  helpers,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/', viewsRoute);
app.use('/api/users', usuarioRoute);
app.use('/api/movies', peliculasRoute);
app.use('/api/pets', mascotasRoute);

app.use((error, req, res, next) => {
  console.error({ error });
  res.status(500).json({ error });
});

const port = 8080;
app.listen(port, () =>
  console.log(`Servidor de la clase 8 escuchando en el puerto ${port}`),
);
