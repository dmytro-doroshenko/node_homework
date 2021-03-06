const {modelNames: {USER}} = require('../../constants');
const {database} = require('../../constants');
const {USERS_TABLE} = database;

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
            }
        },
        {
            tableName: USERS_TABLE,
            timestamps: false,
        });
};