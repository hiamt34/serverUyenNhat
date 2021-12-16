import { ERROR_MESSAGE } from "../../config/error";
import { checkPassword, hashPassword } from "../../libs/encrypt";
import { generateToken } from "../../libs/token";
import { User } from "../../models";
import { Op } from 'sequelize';

class MidUser {

    async getUserByEmail(email) {
        return await User.findOne({
            where: {
                email,
                del: 0
            }
        })
    }
    async getUserByid(id) {

        return await User.findOne({
            where: {
                id,
                del: 0
            }
        });
    }
    async loginUser(credentials) {
        const { email, password } = credentials;
        if (!email) {
            throw new Error('Unregistered email');
        }

        if (!password) {
            throw new Error('Password must contain numbers, letters and be at least 7 characters');
        }

        const userData = await this.getUserByEmail(email);

        if (!userData) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_ACC);
        }

        const isCorrectPass = await checkPassword(password, userData.password);
        if (!isCorrectPass) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_PASS);
        }
        const token = await generateToken({ userid: userData.id, email: email });

        return token;
    }

    async createUser(data) {
        if (!data.password) {
            throw new Error(ERROR_MESSAGE.USER.ERR_PASS);
        }

        if (!data.email) {
            throw new Error(ERROR_MESSAGE.USER.ERR_EMAIL);
        }
        let check = await User.findOne({
            where: {
                email: data.email,
            }
        })
        if (check) {
            throw new Error(ERROR_MESSAGE.USER.ERR_EXIST);
        }

        let dataCreate = {
            password: hashPassword(data.password),
            email: data.email,
            gender: data.gender,
            firstname: data.firstname || null,
            lastname: data.lastname || null,
            phone: data.phone || null,
            address: data.address,
            del: 0,
        }

        let UserCreated = await User.create(dataCreate);

        return UserCreated;

    }

    async getAllUser(data) {
        let condition = {
            del: 0
        }
        if (data.email) {
            condition.email = {
                [Op.like]: `%${data.email}%`
            }
        }
        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        const [listUser, total] = await Promise.all([
            User.findAll({
                where: condition,
                order: [["id", "DESC"]],
                limit,
                offset: (page - 1) * limit,
            }),
            User.count({
                where: condition,

            }),
        ]);

        return { listUser, total };

    }

    async deleteUser(data) {
        let objDelete = await User.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })

        if (!objDelete) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_NOTFOUND);
        };

        let dataDelete = {
            del: 1,
        }
        objDelete.update(dataDelete)
    }


    async updateUser(data, id) {
        if (!id) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_NOTFOUND);
        }
        let objUpdate = await User.findOne({
            where: {
                id: id
            }
        })

        let dataUpdate = {
            gender: data.gender,
            phone: data.phone,
            address: data.address,
            firstname: data.firstname,
            lastname: data.lastname,
            del: 0,
        };
        objUpdate.update(dataUpdate);


        return true;

    }
    async updatePassword(data) {

        if (!data.newPassword) {
            throw new Error(ERROR_MESSAGE.USER.ERR_PASS);
        }
        if (!data.oldPassword) {
            throw new Error(ERROR_MESSAGE.USER.ERR_PASS);
        }
        let cId = await User.findOne({
            where: {
                id: data.id,
            }
        })

        if (!cId) {
            throw new Error(ERROR_MESSAGE.USER.ERR_NOT_EXIST);
        }

        let isCorrect = await checkPassword(data.oldPassword, cId.password)

        if (!isCorrect) {
            throw new Error(ERROR_MESSAGE.USER.ERR_CHECK_PASS);
        }


        let dataUpdate = {
            password: hashPassword(data.newPassword),
        };
        return await cId.update(dataUpdate);

    }
    async getDetailUser(id) {
        let condition = {
            del: 0,
            id
        }

        return User.findOne({
            where: condition
        })
    }

    async registerMember(data) {
        if (!data.password) {
            throw new Error(ERROR_MESSAGE.USER.ERR_PASS);
        }

        if (!data.email) {
            throw new Error(ERROR_MESSAGE.USER.ERR_EMAIL);
        }

        let check = await User.findOne({
            where: {
                email: data.email,
            }
        })

        if (check) {
            throw new Error(ERROR_MESSAGE.USER.ERR_EXIST);
        }

        let dataCreate = {
            password: hashPassword(data.password),
            email: data.email,
            gender: data.gender,
            phone: data.phone,
            address: data.address,
            firstname: data.firstname,
            lastname: data.lastname,
            del: 0,
        }
        let objUser = await User.create(dataCreate);
        return { objUser };
    }

    async changePassword(data, id) {
        let objUpdate = await User.findOne({
            where: {
                id,
                del: 0
            }
        })

        if (!objUpdate) throw new Error('Tài khoản không hợp lệ');

        if (!checkPassword(data.oldPassword, objUpdate.password)) throw new Error('Sai mật khẩu');

        return objUpdate.update({ password: hashPassword(data.password) });
    }
}

export default new MidUser();