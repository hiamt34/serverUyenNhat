import { MidGroup } from "../middle";
import { uploadMedia } from '../../libs/upload';
class GroupController {
    async getGroupInfo(req, res) {
        const { id } = req.query;

        return await MidGroup.getGroupInfo(id);
    }

    async deleteGroup(req, res) {
        const { id } = req.query;
        let { userData } = req;
        return await MidGroup.deleteGroup(userData.id, id);
    }

    async addGroup(req, res) {
        let { userData } = req;
        if (!userData) throw new Error('Tài khoản không hợp lệ');
        const dataUpload = await uploadMedia(req, res);
        let data = req.body;
        data.image = dataUpload.filename;
        data.owner_id = userData.id;
        return await MidGroup.addGroup(data);
    }

    async updateGroup(req, res) {
        let { userData } = req;
        if (!userData) throw new Error('Tài khoản không hợp lệ');
        const dataUpload = await uploadMedia(req, res);
        let data = req.body;
        if (dataUpload && dataUpload.filename) {
            data.image = dataUpload.filename;
        }
        return await MidGroup.updateGroup(userData.id, data);
    }

    async getAllGroup(req, res) {
        const { group_name, address} = req.query;
        return await MidGroup.getAllGroup(group_name, address);
    }

    async userRergisterGroup(req, res) {
        let { userData } = req;
        console.log('234', userData.id)
        if (!userData) throw new Error('Tài khoản không hợp lệ');

        const { group_id } = req.body;
        return await MidGroup.userRergisterGroup(userData.id, group_id);
    }

    async userOutGroup(req, res) {
        let { userData } = req;
        if (!userData) throw new Error('Tài khoản không hợp lệ');

        const { group_id } = req.query;
        return await MidGroup.userOutGroup(userData.id, group_id);
    }

    async forceUserOutGroup(req, res) {
        let { userData } = req;
        if (!userData) throw new Error('Tài khoản không hợp lệ');

        const { user_id, group_id } = req.query;
        return await MidGroup.forceUserOutGroup(userData.id, user_id, group_id);
    }
}
export default new GroupController();