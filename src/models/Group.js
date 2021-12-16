import { DataTypes } from 'sequelize';
import BaseModel from "./BaseModel";
import { sequelize } from '../connections';
import { v4 as uuidv4 } from 'uuid';
import Sequelize from 'sequelize';
import User from './User';
import UserGroup from './User_Group';

export default class Group extends BaseModel {
    static association() {
        Group.hasMany(UserGroup, { as: 'user_group', foreignKey: 'group_id' })
        Group.belongsTo(User, { as: 'owner_group', foreignKey: 'owner_id' })
     }
}

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    owner_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    quantity: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    time: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
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
    tableName: 'group',
    hooks: {
        beforeCreate: beforeCreate
    }
};

Group.init(attributes, { ...options, sequelize });
