import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay, replaceOrderItem} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

import optionalAuth from '../middleware/optionalAuth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',optionalAuth,placeOrder)
orderRouter.post('/stripe',optionalAuth,placeOrderStripe)
orderRouter.post('/razorpay',optionalAuth,placeOrderRazorpay)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/replaceItem',authUser,replaceOrderItem)

// verify payment
orderRouter.post('/verifyStripe',optionalAuth, verifyStripe)
orderRouter.post('/verifyRazorpay',optionalAuth, verifyRazorpay)

export default orderRouter