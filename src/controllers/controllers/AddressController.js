import { MidAddress } from "../middle";
class AddressController {
    async getAddressInfo(req, res) {
        const { id } = req.query;

        return await MidAddress.getAddressInfo(id);
    }

    async deleteAddress(req, res) {
        const { id } = req.query;
        return await MidAddress.deleteAddress(id);
    }

    async addAddress(req, res) {
        let { userData } = req;
        if (!userData) throw new Error('Tài khoản không hợp lệ');
        let data = req.body;
        return await MidAddress.addAddress(data);
    }

    async updateAddress(req, res) {
        let { userData } = req;
        if (!userData) throw new Error('Tài khoản không hợp lệ');
        let data = req.body;
        return await MidAddress.updateAddress(data);
    }

    async getAllAddress(req, res) {
        const { text } = req.query;
        return await MidAddress.getAllAddress(text);
    }
}
export default new AddressController();