import { Router } from 'express';
import { AuthController } from '../controllers/controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();
routerApp.post('/login', Response(AuthController.login));
routerApp.get('/getInfo', isAuth, Response(AuthController.getUserInfo));


export default routerApp;