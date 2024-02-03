import { Express, Request, Response } from 'express';
import userController from '../Controller/user.controller';
import productController from '../Controller/product.controller';


const routerSetup = (app: Express) =>
app
.get('/', async (req: Request, res: Response) => {
  res.send('<h1 style="color:Tomato;">Hello Express!</h1>');
})
.use('/', userController)
.use('/', productController)

export default routerSetup;