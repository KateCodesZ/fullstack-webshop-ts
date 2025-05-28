import { Router } from 'express';
import { getAllProducts, getNewProducts, getSaleProducts } from '../controllers/ProductController';

const router = Router();
router.get('/', getAllProducts);
router.get('/new', getNewProducts);
router.get('/sale', getSaleProducts);
export default router;
