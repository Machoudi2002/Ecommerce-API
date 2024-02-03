import cors from 'cors';
import { Express } from 'express';
import { validateApiKey } from '../Events/user.auth';

const securitySetup = (app: Express, express: any) =>
  app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended : true }))
  // .use("/products", validateApiKey);


export default securitySetup;