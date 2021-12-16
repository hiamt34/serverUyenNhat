import { MidUser } from "../middle";

class AuthController {
    login(req, res) {
        return MidUser.loginUser(req.body);
    }
   
    async getUserInfo(req, res) {
        let { userData } = req;
        userData = userData.toJSON();
        return userData;
    }


}
export default new AuthController();