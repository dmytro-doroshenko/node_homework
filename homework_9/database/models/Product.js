const {PRODUCTS_TABLE} = require('../../config');
const {modelNames: {PRODUCT}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(PRODUCT, {
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
            },
            discount: {
                type: DataTypes.DECIMAL,
                allowNull: true,
            },
            photo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            tableName: PRODUCTS_TABLE,
            timestamps: false,
        });

    const User = sequelize.import('./User.js');

    Product.belongsTo(User, {foreignKey: 'userId'});

    return Product;
};