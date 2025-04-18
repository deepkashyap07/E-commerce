import express from "express";

import { placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateOrderStatus, verifyStripe } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/auth.js";
import authUser from "../middleware/auth.js";


const orderRouter = express.Router();


// admin features 
orderRouter.post("/list",adminAuth,allOrders );
orderRouter.post("/status", adminAuth,updateOrderStatus);

// payment features
orderRouter.post("/place",userAuth ,placeOrder);
orderRouter.post("/stripe",userAuth ,placeOrderStripe);
orderRouter.post("/razorpay",userAuth ,placeOrderRazorpay);

// user features
orderRouter.post("/userorders",userAuth,userOrders);

//verify payment
orderRouter.post("/verifyStripe",authUser,verifyStripe)
export default orderRouter;

