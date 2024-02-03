import { Router } from "express";
import { verifyAccess } from '../Events/user.auth';
import { postNewProduct, getAllProducts, getProductBySlug, updateProductById, deleteProductById } from "../Events/product.events";
const productController = Router();

productController
  .post('/new-product', postNewProduct)
  .get('/products', getAllProducts)
  .get('/products/:slug', getProductBySlug)
  .put('/products/:id', verifyAccess, updateProductById)
  .delete('/products/:id', verifyAccess, deleteProductById);

export default productController;