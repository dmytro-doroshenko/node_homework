const {USERS_TABLE} = require('../../config');
const {modelNames} = require('../../constants');

const {USER} = modelNames;

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(USER, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            photo: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            tableName: USERS_TABLE,
            timestamps: false,
        });
};