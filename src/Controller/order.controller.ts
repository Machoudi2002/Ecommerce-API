import { Router } from "express";
import { verifyAccess } from "../Events/user.auth";
import { postNewOrder, getAllOrders, getMyOrders } from "../Events/order.events";


const orderController = Router();

orderController
  .post('/new-order', verifyAccess, postNewOrder)
  .get('/all-orders', verifyAccess, getAllOrders)
  .get('/my-orders', verifyAccess, getMyOrders)


export default orderController;