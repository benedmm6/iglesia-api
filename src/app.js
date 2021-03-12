import express from 'express';
import morgan from 'morgan';

//init
import { createRoles } from './libs/initSetup';

// RUTAS
import gruposRoutes from './routes/grupo.routes';
import authRoutes from './routes/auth.routes';
import usuarioRoutes from './routes/usuarios.routes';

const app = express();
createRoles();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/grupos', gruposRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/usuarios', usuarioRoutes);


export default app;
