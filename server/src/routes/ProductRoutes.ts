import { Router, Request, Response } from 'express';
import { getAllProducts, getNewProducts, getSaleProducts, getProductById } from '../controllers/ProductController';
import pool from '../db/db';

const router = Router();
router.get('/', getAllProducts);
router.get('/new', getNewProducts);
router.get('/sale', getSaleProducts);
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name FROM categories');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});
router.get('/colors', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, hex FROM colors');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch colors' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    await getProductById(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
