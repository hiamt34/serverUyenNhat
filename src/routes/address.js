import { Router } from 'express';
import { AddressController } from '../controllers/controllers';
import { isAuth } from '../middlewares/auth';
import { Response } from '../libs/handle_response';

let routerApp = new Router();

routerApp.get('/getAll', isAuth, Response(AddressController.getAllAddress));
routerApp.put('/update', isAuth, Response(AddressController.updateAddress));
routerApp.put('/get-info', isAuth, Response(AddressController.getAddressInfo));
routerApp.get('/delete', isAuth, Response(AddressController.deleteAddress));
routerApp.get('/add', isAuth, Response(AddressController.addAddress));

export default routerApp;