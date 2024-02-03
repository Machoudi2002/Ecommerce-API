import { Router } from "express";
import { verifyAccess } from "../Events/user.auth";
import { getMyCart, addProductToCart, removeAmountFromCart, deleteProductFromCart } from "../Events/cart.events";


const cartController = Router();

cartController
  .post('/add-to-cart', verifyAccess, addProductToCart)
  .post('/minos-amount', verifyAccess, removeAmountFromCart)
  .get('/my-cart', verifyAccess, getMyCart)
  .put('/remove-from-cart', verifyAccess, deleteProductFromCart)


export default cartController;