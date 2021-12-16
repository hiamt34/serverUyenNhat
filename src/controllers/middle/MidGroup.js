import { Group } from "../../models";
import { Op } from 'sequelize';
import { UserGroup } from "../../models";

class MidGroup {
    async getGroupInfo(id) {
        let includeOpt = [
            {
                association: "user_group",
                required: false,
                include: [
                    {
                        association: "user",
                        required: false,
                        where: {
                            del: 0
                        }
                    },
                ],
                where: {
                    del: 0
                }
            }
        ]

        return Group.findOne({
            where: {
                id,
                del: 0
            },
            include: includeOpt
        })
    }

    async addGroup(data) {
        data.del = 0;
        let newGroup = await Group.create(data);
        if (newGroup) {
            UserGroup.create({
                user_id: data.owner_id,
                group_id: newGroup.id,
                del: 0
            })
            
            return newGroup;
        }
        
        return null;
    }

    async updateGroup(owner_id, data) {
        let groupUpdate = await Group.findOne({
            where: {
                id: data.id,
                del: 0,
                owner_id
            }
        })

        return groupUpdate.update(data);
    }

    async deleteGroup(owner_id, id) {
        let groupDelete = await Group.findOne({
            where: {
                id,
                del: 0,
                owner_id
            }
        })

        if (groupDelete) {
            groupDelete.update({ del: 1 });
            return true;
        }

        return false;
    }

    async getAllGroup(group_name, address) {

        let condition = {
            del: 0
        }

        if (group_name) {
            condition.name = {
                [Op.like]: `%${group_name}%`
            }
        }

        if (address) {
            condition.address = {
                [Op.like]: `%${address}%`
            }
        }


        let includeOpt = [
            {
                association: "user_group",
                required: true,
                where: { del: 0 }
            },
            {
                association: "owner_group",
                required: true,
                where: { del: 0 }
            }
        ];

        return Group.findAndCountAll({
            where: condition,
            include: includeOpt
        });
    }

    async userRergisterGroup(user_id, group_id) {
        let data = {
            user_id,
            group_id,
            del: 0
        }

        let updateGroup = await Group.findOne({
            where: {
                id: group_id
            }
        });

        if (updateGroup) {
            updateGroup.update({
                quantity: (updateGroup.quantity || 0) + 1
            });

            let isRegisted = await UserGroup.findOne({
                where: {
                    user_id,
                    group_id,
                    del: 0
                }
            })

            console.log('123', isRegisted)

            if (isRegisted) {
                throw new Error('Bạn hiện đang ở trong nhóm này');
            }

            UserGroup.create(data);
            return true;
        }

        return false;
    }

    async userOutGroup(user_id, group_id) {
        let updateUserGroup = await UserGroup.findOne({
            where: {
                group_id,
                user_id,
                del: 0
            }
        })

        let groupUpdate = await Group.findOne({
            where: {
                id: group_id,
                del: 0
            }
        });

        if (groupUpdate) {
            updateUserGroup.update({
                del: 1
            })

            groupUpdate.update({
                quantity: (groupUpdate.quantity || 1) - 1
            })

            return true;
        }

        return false;
    }

    async forceUserOutGroup(owner_id, user_id, group_id) {

        let groupUpdate = await Group.findOne({
            where: {
                id: group_id,
                del: 0,
                owner_id
            }
        });

        if (groupUpdate) {
            let updateUserGroup = await UserGroup.findOne({
                where: {
                    group_id,
                    user_id,
                    del: 0
                }
            })

            if (updateUserGroup) {
                updateUserGroup.update({
                    del: 1
                })
            }


            groupUpdate.update({
                quantity: (groupUpdate.quantity || 1) - 1
            })

            return true;
        }

        return false;
    }
}

export default new MidGroup();