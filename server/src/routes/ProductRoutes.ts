import { Router } from 'express';
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

// Product search endpoint
async function searchProducts(req: { query: { q?: string } }, res: { json: (data: unknown) => void; status: (code: number) => { json: (data: unknown) => void } }) {
  const query = req.query.q;

  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    return res.json([]);
  }

  try {
    const result = await pool.query(
      'SELECT id, name, image, price, discount_price AS "salePrice", is_sale FROM products WHERE LOWER(name) LIKE $1 ORDER BY name ASC LIMIT 10',
      [`%${query.toLowerCase()}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
}

router.get('/search', searchProducts);
router.get('/:id', async (req, res) => {
  try {
    await getProductById(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
