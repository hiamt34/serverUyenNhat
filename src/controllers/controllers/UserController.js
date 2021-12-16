import { MidUser } from "../middle";
class UserController {
    async register(req, res) {
        let data = req.body;
        return MidUser.registerMember(data);
    }
    async getInfoFriend(req, res) {
        let { id } = req.query;
        return await MidUser.getUserByid(id);
    }
    async getAllUser(req, res) {
        let data = req.query;
        return await MidUser.getAllUser(data);
    }
    async getMyDetail(req, res) {
        let { userData } = req;
        return await MidUser.getDetailUser(userData.id);
    }
    async update(req, res) {
        let { userData } = req;
        if (!userData) throw new Error('Tài khoản không hợp lệ');
        let data = req.body;
        return await MidUser.updateUser(data, userData.id);
    }

    async deleteUser(req, res) {
        let { userData } = req;
        return await MidUser.deleteUser(userData);
    }

    async changePassword(req, res) {
        let { userData } = req;
        if (!userData) throw new Error('Tài khoản không hợp lệ');

        let data = req.body;
        return await MidUser.changePassword(data, userData.id);
    }
}
export default new UserController();