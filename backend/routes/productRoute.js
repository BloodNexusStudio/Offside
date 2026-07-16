import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, addProductReview, updateProduct, getBestSellers, updateBestSellerStatus } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.any(),addProduct);
productRouter.post('/update',adminAuth,upload.any(),updateProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts)
productRouter.get('/best-sellers', getBestSellers)
productRouter.patch('/:id/bestseller', adminAuth, updateBestSellerStatus)
productRouter.post('/review', authUser, addProductReview);

export default productRouter