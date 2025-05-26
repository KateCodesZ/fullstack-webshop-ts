import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import pool from './db/db';
import productRoutes from './routes/ProductRoutes';
import authRoutes from './routes/AuthRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.connect();
    console.log('Ansluten till databasen!');

    app.use(cors());
    app.use(express.json());
    app.use('/products', productRoutes);
    app.use('/auth', authRoutes);

    app.get('/', (req, res) => {
      res.send('Server is running and connected to the database!');
    });

    app.listen(PORT, () => {
      console.log(`Ready http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error at startup:', err);
  }
};

startServer();
