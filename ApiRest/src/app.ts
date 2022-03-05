import express,{Application} from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import authRoutes from './routes/auth';
import votoRoutes from './routes/voto';
import listaRoutes from './routes/lista';
import candidatosRoutes from './routes/candidatos';
import procesoRoutes from './routes/proceso';
import deleteRoute from './routes/delete';
import estudianteRoutes from './routes/estudiate';
import archivosRoutes from './routes/archivos';
import seguridadRoutes from './routes/seguridad';

const fileUpload = require('express-fileupload');

const app: Application = express();

// settings
app.set('port', process.env.PORT || 3001);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
// app.use(express.raw({ type: 'image/*', limit: '2Mb'}));
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
    uploadTimeout: 60000
}));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/voto', votoRoutes);
app.use('/api/lista', listaRoutes);
app.use('/api/candidatos', candidatosRoutes);
app.use('/api/proceso', procesoRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/delete', deleteRoute);
app.use('/api/archivo', archivosRoutes);
app.use('/api/seguridad', seguridadRoutes);

// la carpeta de usa para almacenar imagenes
app.use('/uploads', express.static(path.resolve('uploads')))

export default app;