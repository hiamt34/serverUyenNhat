import { DataTypes } from 'sequelize';
import BaseModel from "./BaseModel";
import { sequelize } from '../connections';
import { v4 as uuidv4 } from 'uuid';
import Sequelize from 'sequelize';

export default class Address extends BaseModel {
    static association() { }
}

const attributes = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    text: {
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
    tableName: 'address',
    hooks: {
        beforeCreate: beforeCreate
    }
};

Address.init(attributes, { ...options, sequelize });
