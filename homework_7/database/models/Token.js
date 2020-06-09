const {modelNames, database, words} = require('../../constants');

const {TOKENS_TABLE} = database;
const {TOKEN} = modelNames;
const {NOW} = words;

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(TOKEN, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            accessToken: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn(NOW),
            },
        },
        {
            tableName: TOKENS_TABLE,
            timestamps: false,
        });
};