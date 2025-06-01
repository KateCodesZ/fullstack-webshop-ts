import { Request, Response } from 'express';
import pool from '../db/db';
import { Product } from '../types';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Product>(
      `SELECT *,
        CASE WHEN is_sale = TRUE AND discount_price IS NOT NULL AND discount_price < price
          THEN discount_price ELSE price END AS effective_price,
        CASE WHEN is_sale = TRUE AND discount_price IS NOT NULL AND discount_price < price
          THEN discount_price ELSE NULL END AS discount_price
      FROM products`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNewProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Product>(
      `SELECT *,
        CASE WHEN is_sale = TRUE AND discount_price IS NOT NULL AND discount_price < price
          THEN discount_price ELSE price END AS effective_price,
        CASE WHEN is_sale = TRUE AND discount_price IS NOT NULL AND discount_price < price
          THEN discount_price ELSE NULL END AS discount_price
      FROM products WHERE is_new = TRUE`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching new products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSaleProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Product>(
      `SELECT *,
        CASE WHEN is_sale = TRUE AND discount_price IS NOT NULL AND discount_price < price
          THEN discount_price ELSE price END AS effective_price,
        CASE WHEN is_sale = TRUE AND discount_price IS NOT NULL AND discount_price < price
          THEN discount_price ELSE NULL END AS discount_price
      FROM products WHERE is_sale = TRUE`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching new products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query<Product>(
      `SELECT *,
        CASE WHEN is_sale = TRUE AND discount_price IS NOT NULL AND discount_price < price
          THEN discount_price ELSE price END AS effective_price,
        CASE WHEN is_sale = TRUE AND discount_price IS NOT NULL AND discount_price < price
          THEN discount_price ELSE NULL END AS discount_price
      FROM products WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching product by id:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
