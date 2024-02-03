import { Router } from 'express';
import { loginUser, registerNewUser } from '../Events/user.events';

const userController = Router();

userController
  .post('/register', registerNewUser)
  .post('/login', loginUser)

  

export default userController;