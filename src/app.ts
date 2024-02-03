import express from 'express';
import appSetup from './Start/init';
import routerSetup from './Start/router';
import securitySetup from './Start/security';
const app = express();

appSetup(app);
securitySetup(app, express);
routerSetup(app);