import express from 'express'
import { addCollection, listCollections, removeCollection } from '../controllers/collectionController.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'

const collectionRouter = express.Router();

collectionRouter.post('/add', adminAuth, upload.fields([{name:'image', maxCount:1}]), addCollection);
collectionRouter.post('/remove', adminAuth, removeCollection);
collectionRouter.get('/list', listCollections);

export default collectionRouter;
