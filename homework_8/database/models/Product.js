const {modelNames: {PRODUCT}} = require('../../constants');
const {database} = require('../../constants');
const {PRODUCTS_TABLE} = database;

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(PRODUCT, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            }
        },
        {
            tableName: PRODUCTS_TABLE,
            timestamps: false,
        });
};