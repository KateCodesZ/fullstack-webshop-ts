import { Router } from 'express';
import { getAllProducts, getNewProducts, getSaleProducts } from '../controllers/ProductController';
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

export default router;
