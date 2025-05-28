import { Router } from 'express';
import { getAllProducts, getNewProducts } from '../controllers/ProductController';

const router = Router();
router.get('/', getAllProducts);
router.get('/new', getNewProducts);
export default router;
