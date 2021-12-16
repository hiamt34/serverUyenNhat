import BaseModel from "./BaseModel";
import { sequelize } from '../connections';
import { v4 as uuidv4 } from 'uuid';
import Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import User from "./User";

export default class UserGroup extends BaseModel {
    static association() {
        UserGroup.belongsTo(User, { as: 'user', foreignKey: 'user_id' })
    }
}

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    group_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: null
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
};

function beforeCreate() {
    User.beforeCreate((obj, _) => {
        return obj.id = uuidv4();
    });
}

const options = {
    tableName: 'user_group',
    hooks: {
        beforeCreate: beforeCreate
    }
};
UserGroup.init(attributes, { ...options, sequelize });
