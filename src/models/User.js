import BaseModel from "./BaseModel";
import { sequelize } from '../connections';
import { v4 as uuidv4 } from 'uuid';
import Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';

export default class User extends BaseModel {
    static association() {}
}

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    firstname: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    lastname: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    gender: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: null
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    address: {
        type: DataTypes.STRING(255),
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
    tableName: 'user',
    hooks: {
        beforeCreate: beforeCreate
    }
};
User.init(attributes, { ...options, sequelize });
