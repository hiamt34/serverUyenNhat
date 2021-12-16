import { Router } from 'express';
import { GroupController } from '../controllers/controllers';
import { isAuth } from '../middlewares/auth';
import { Response } from '../libs/handle_response';

let routerApp = new Router();

routerApp.get('/getAll', isAuth, Response(GroupController.getAllGroup));
routerApp.put('/update', isAuth, Response(GroupController.updateGroup));
routerApp.get('/get-info', isAuth, Response(GroupController.getGroupInfo));
routerApp.get('/delete', isAuth, Response(GroupController.deleteGroup));
routerApp.post('/add', isAuth, Response(GroupController.addGroup));
routerApp.post('/register', isAuth, Response(GroupController.userRergisterGroup));
routerApp.get('/out', isAuth, Response(GroupController.userOutGroup));
routerApp.get('/force-out', isAuth, Response(GroupController.forceUserOutGroup));//may caiai nay hinh nhu doc ghi chu
//het r dung k e, , da a
//co gang dungg het cho api nay cho do lang phi e nhe :)) da e se co gang a, cai update chac cung biet lam e nhỉ,
// da biet ma so lam ko kip,nhanh ma e, 

export default routerApp;