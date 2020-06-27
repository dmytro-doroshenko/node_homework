const {TOKENS_TABLE} = require('../../config');
const {modelNames, words} = require('../../constants');

const {TOKEN} = modelNames;
const {NOW} = words;

module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(TOKEN, {
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

    const User = sequelize.import('./User.js');

    Token.belongsTo(User, {foreignKey: 'userId', as: 'user'});

    return Token;
};