import express,{Application} from "express";
import authRoutes from './routes/auth';
import morgan from "morgan";
import cors from "cors";

const app: Application = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.raw({ type: 'image/*', limit: '2Mb'}));

// routes
app.use(authRoutes);


export default app;