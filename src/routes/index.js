import { Router } from 'express';
import auth from './auth';
import user from './user';
import group from './group';
import address from './address';

let routerApp = new Router();

routerApp.use('/auth', auth);
routerApp.use('/user', user);
routerApp.use('/group', group);
routerApp.use('/address', address);

export default routerApp;