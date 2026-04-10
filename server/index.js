import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';

//middlewares
import chechJWT from './middlewares/jwt.js';

//Routes
import { getHealth, getHome } from './controllers/health.js';
import { getSignUp, getLogin } from './controllers/auth.js';
import { getCreateTour, getTours } from './controllers/tours.js';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

//Home APIs
app.get('/', getHome);
app.get('/health', getHealth);

//Authentication APIs
app.post('/signup', getSignUp);
app.post('/login', getLogin);
    
//Tour APIs
app.post('/tours', chechJWT, getCreateTour);
app.get('/tours', chechJWT, getTours);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});