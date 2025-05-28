import { Request, Response } from 'express';
import pool from '../db/db';
import { Product } from '../types';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Product>('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNewProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Product>('SELECT * FROM products WHERE is_new = TRUE');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching new products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSaleProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Product>('SELECT * FROM products WHERE is_sale = TRUE');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching new products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
