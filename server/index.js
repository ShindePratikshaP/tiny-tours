import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.port || 8080;


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tiny Tours API'});
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});