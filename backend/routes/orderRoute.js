import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay, replaceOrderItem} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import authOptional from '../middleware/authOptional.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authOptional,placeOrder)
orderRouter.post('/stripe',authOptional,placeOrderStripe)
orderRouter.post('/razorpay',authOptional,placeOrderRazorpay)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/replaceItem',authUser,replaceOrderItem)

// verify payment
orderRouter.post('/verifyStripe',authOptional, verifyStripe)
orderRouter.post('/verifyRazorpay',authOptional, verifyRazorpay)

export default orderRouter