import express from 'express';
import { updateWishlist, getWishlist } from '../controllers/wishlistController.js';
import authUser from '../middleware/auth.js';

const wishlistRouter = express.Router();

wishlistRouter.post('/update', authUser, updateWishlist);
wishlistRouter.post('/get', authUser, getWishlist);

export default wishlistRouter;
