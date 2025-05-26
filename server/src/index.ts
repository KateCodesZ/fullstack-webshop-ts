import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import pool from './db/db';
import productRoutes from './routes/ProductRoutes';
import authRoutes from './routes/AuthRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running and connected to the database!');
});

const startServer = async () => {
  try {
    await pool.connect();
    console.log('Ansluten till databasen!');
    app.listen(PORT, () => {
      console.log(`Ready http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error at startup:', err);
  }
};

startServer();
