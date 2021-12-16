import { Router } from 'express';
import { UserController } from '../controllers/controllers';
import { isAuth } from '../middlewares/auth';
import { Response } from '../libs/handle_response';

let routerApp = new Router();

routerApp.post('/register', Response(UserController.register));
routerApp.get('/getAll', isAuth, Response(UserController.getAllUser));
routerApp.post('/update', isAuth, Response(UserController.update));
routerApp.put('/change-password', isAuth, Response(UserController.changePassword));
routerApp.get('/delete', isAuth, Response(UserController.deleteUser));
routerApp.get('/info-friend', isAuth, Response(UserController.getInfoFriend));
routerApp.get('/userInfo', isAuth, Response(UserController.getMyDetail));

export default routerApp;