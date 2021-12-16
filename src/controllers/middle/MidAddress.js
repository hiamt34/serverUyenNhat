import { Address } from "../../models";
import { Op } from 'sequelize';

class MidAddress {
    async getAddressInfo(id) {
        return Address.findOne({
            where: {
                id,
                del: 0
            }
        })
    }

    async addAddress(data) {
        return Address.create(data);
    }

    async updateAddress(data) {
        let AddressUpdate = await Address.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })

        return AddressUpdate.update(data);
    }

    async deleteAddress(id) {
        let AddressDelete = await Address.findOne({
            where: {
                id,
                del: 0
            }
        })

        return AddressDelete.update({ del: 1 });
    }

    async getAllAddress(text) {
        let condition = {
            del: 0
        }

        if (text) {
            condition.text = {
                [Op.like]: `%${text}%`
            }
        }
        return Address.findAndCountAll({
            where: condition
        });
    }
}

export default new MidAddress();