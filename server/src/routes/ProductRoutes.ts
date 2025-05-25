import { Router } from 'express';
import { getAllProducts } from '../controllers/ProductController';

const router = Router();
router.get('/', getAllProducts);
export default router;
